import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const TO_EMAIL = "info@devbarisgul.com";

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

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
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
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "E-posta gönderilemedi. Lütfen daha sonra tekrar deneyin." },
      { status: 500 }
    );
  }
}

function escapeHtml(text) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
  return String(text).replace(/[&<>"']/g, (m) => map[m]);
}
