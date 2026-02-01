import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import { readFileSync, existsSync } from "fs";

const TO_EMAIL = "info@devbarisgul.com";

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
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Ad, e-posta ve mesaj zorunludur." },
        { status: 400 }
      );
    }

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      loadEnvLocal();
    }
    const hasSmtp =
      process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;
    if (!hasSmtp) {
      console.error(
        "SMTP ayarları eksik. Yerelde: .env.local var mı? Sunucuyu yeniden başlattınız mı (npm run dev)? Canlıda: DigitalOcean ortam değişkenleri tanımlı mı?"
      );
      return NextResponse.json(
        {
          error:
            "E-posta sunucusu yapılandırılmamış. Yerelde .env.local dosyası var ve sunucuyu yeniden başlattıysanız; canlıda (DigitalOcean) ortam değişkenlerini ekleyin: SMTP_HOST, SMTP_USER, SMTP_PASS.",
        },
        { status: 503 }
      );
    }

    const port = Number(process.env.SMTP_PORT) || 587;
    const useSecure = process.env.SMTP_SECURE === "true";
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: useSecure,
      requireTLS: !useSecure && port === 587,
      tls: { rejectUnauthorized: false },
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER || TO_EMAIL,
      to: TO_EMAIL,
      replyTo: email.trim(),
      subject: `İletişim formu: ${name.trim()}`,
      text: [
        `İsim: ${name.trim()}`,
        `E-posta: ${email.trim()}`,
        `Telefon: ${phone || "-"}`,
        "",
        "Mesaj:",
        message.trim(),
      ].join("\n"),
      html: [
        "<h2>Yeni iletişim formu mesajı</h2>",
        "<p><strong>İsim:</strong> " + escapeHtml(name.trim()) + "</p>",
        "<p><strong>E-posta:</strong> " + escapeHtml(email.trim()) + "</p>",
        "<p><strong>Telefon:</strong> " + escapeHtml(phone || "-") + "</p>",
        "<p><strong>Mesaj:</strong></p>",
        "<p>" + escapeHtml(message.trim()).replace(/\n/g, "<br>") + "</p>",
      ].join(""),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err?.message || String(err);
    const code = err?.code || "";
    console.error("Contact form error:", code, msg, err);
    const isDev = process.env.NODE_ENV === "development";
    const userMessage = isDev
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
