import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import { readFileSync, existsSync } from "fs";
import net from "net";

const TO_EMAIL = "info@devbarisgul.com";

function sendPlainSMTP(options) {
  return new Promise((resolve, reject) => {
    const { host, port, user, pass, from, to, subject, text } = options;
    const socket = net.createConnection(port, host, () => {});
    let step = "connect";
    let buffer = "";
    const send = (cmd) => {
      socket.write(cmd + "\r\n");
    };
    const getLastLine = () => {
      const parts = buffer.split("\r\n").filter(Boolean);
      return parts[parts.length - 1] || "";
    };
    const getCode = (line) => parseInt(String(line).slice(0, 3), 10) || 0;
    const isLastLineOfReply = (line) => /^\d{3}\s/.test(line) || line.length >= 4;
    const collect = (data) => {
      buffer += data.toString();
      const last = getLastLine();
      const code = getCode(last);
      if (code >= 500 || (code >= 400 && code < 500)) {
        socket.destroy();
        reject(new Error(last || "SMTP error"));
        return;
      }
      if (step === "connect" && last) {
        send("EHLO localhost");
        step = "ehlo";
        buffer = "";
      } else if (step === "ehlo" && last && isLastLineOfReply(last)) {
        const authPlain = Buffer.from("\0" + user + "\0" + pass, "utf8").toString("base64");
        send("AUTH PLAIN " + authPlain);
        step = "auth";
        buffer = "";
      } else if (step === "auth" && last && isLastLineOfReply(last)) {
        send("MAIL FROM:<" + from + ">");
        step = "from";
        buffer = "";
      } else if (step === "from" && last && isLastLineOfReply(last)) {
        send("RCPT TO:<" + to + ">");
        step = "to";
        buffer = "";
      } else if (step === "to" && last && isLastLineOfReply(last)) {
        send("DATA");
        step = "data";
        buffer = "";
      } else if (step === "data" && last && last.startsWith("354")) {
        const body = "Subject: " + subject + "\r\nFrom: " + from + "\r\nTo: " + to + "\r\nContent-Type: text/plain; charset=utf-8\r\n\r\n" + text;
        send(body);
        send(".");
        step = "done";
        buffer = "";
      } else if (step === "done" && last && isLastLineOfReply(last)) {
        send("QUIT");
        socket.end();
        if (code >= 200 && code < 400) resolve();
        else reject(new Error(last));
      }
    };
    socket.setEncoding("utf8");
    socket.on("data", collect);
    socket.setTimeout(20000);
    socket.on("timeout", () => {
      socket.destroy();
      reject(new Error("SMTP timeout"));
    });
    socket.on("error", reject);
  });
}

function loadEnvLocal() {
  try {
    const dir = process.cwd();
    const envLocalPath = path.join(dir, ".env.local");
    if (existsSync(envLocalPath)) {
      const content = readFileSync(envLocalPath, "utf8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#")) {
          const eq = trimmed.indexOf("=");
          if (eq > 0) {
            const key = trimmed.slice(0, eq).trim();
            const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
            if (!process.env[key]) process.env[key] = value;
          }
        }
      }
    }
  } catch (_) {}
}

export async function POST(request) {
  try {
    loadEnvLocal();
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Ad, e-posta ve mesaj zorunludur." },
        { status: 400 }
      );
    }
    const hasSmtp =
      process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;
    if (!hasSmtp) {
      return NextResponse.json(
        {
          error:
            "E-posta sunucusu yapılandırılmamış. SMTP ayarlarını (.env.local veya sunucu ortam değişkenleri) tanımlayın.",
        },
        { status: 503 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT) || 587;
    const useSecure = process.env.SMTP_SECURE === "true";
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: useSecure,
      requireTLS: port === 587 && !useSecure,
      ignoreTLS: false,
      connectionTimeout: 15000,
      greetingTimeout: 10000,
      tls: {
        rejectUnauthorized: false,
        servername: host,
        minVersion: "TLSv1",
        maxVersion: "TLSv1.3",
      },
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const subject = `İletişim formu: ${name.trim()}`;
    const textBody = [
      `İsim: ${name.trim()}`,
      `E-posta: ${email.trim()}`,
      `Telefon: ${phone || "-"}`,
      "",
      "Mesaj:",
      message.trim(),
    ].join("\n");
    const htmlContent = [
      "<h2>Yeni iletişim formu mesajı</h2>",
      "<p><strong>İsim:</strong> " + escapeHtml(name.trim()) + "</p>",
      "<p><strong>E-posta:</strong> " + escapeHtml(email.trim()) + "</p>",
      "<p><strong>Telefon:</strong> " + escapeHtml(phone || "-") + "</p>",
      "<p><strong>Mesaj:</strong></p>",
      "<p>" + escapeHtml(message.trim()).replace(/\n/g, "<br>") + "</p>",
    ].join("");

    const plainOnlyEnv = (process.env.SMTP_PLAIN_ONLY || "").toLowerCase();
    const usePlainOnly = plainOnlyEnv === "true" || plainOnlyEnv === "1";
    if (usePlainOnly) {
      await sendPlainSMTP({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
        from: process.env.SMTP_FROM || process.env.SMTP_USER || TO_EMAIL,
        to: TO_EMAIL,
        subject,
        text: textBody,
      });
    } else {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER || TO_EMAIL,
      to: TO_EMAIL,
      replyTo: email.trim(),
      subject,
      text: [
        `İsim: ${name.trim()}`,
        `E-posta: ${email.trim()}`,
        `Telefon: ${phone || "-"}`,
        "",
        "Mesaj:",
        message.trim(),
      ].join("\n"),
      html: htmlContent,
    });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err?.message || String(err);
    const code = err?.code || "";
    console.error("Contact form error:", code, msg, err);
    const isDev = process.env.NODE_ENV === "development";
    const showDetail = isDev || process.env.CONTACT_DEBUG === "true";
    const userMessage = showDetail
      ? `E-posta gönderilemedi: ${msg}${code ? ` (${code})` : ""}`
      : "E-posta gönderilemedi. Lütfen daha sonra tekrar deneyin.";
    return NextResponse.json(
      { error: userMessage },
      { status: 500 }
    );
  }
}

function escapeHtml(text) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
  return String(text).replace(/[&<>"']/g, (m) => map[m]);
}
