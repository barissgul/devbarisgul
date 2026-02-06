# İletişim formu – Gmail SMTP ile mail gönderme

Kod artık `.env` / `.env.local` içindeki **SMTP_HOST** değerini kullanıyor. Gmail SMTP kullanırsan 451 hatası olmadan mail gider.

---

## 1. Gmail uygulama şifresi oluştur

1. https://myaccount.google.com/ → **Güvenlik**
2. **2 adımlı doğrulama** açık olmalı (yoksa aç)
3. **Uygulama şifreleri** → “Uygulama seç” = **Posta**, “Cihaz” = Diğer → **Oluştur**
4. Çıkan **16 karakterlik şifreyi** kopyala (boşluksuz)

---

## 2. Sunucudaki .env.local dosyasını güncelle

SSH ile sunucuya bağlan, proje klasörüne gir:

```bash
cd /home/nextjs-app
nano .env.local
```

**Tüm içeriği sil**, aşağıdakini yapıştır. Sadece şunları kendi bilgilerinle değiştir:

- `BURAYA_GMAIL_ADRESIN@gmail.com` → Gmail adresin (örn. devbarisgul@gmail.com)
- `BURAYA_16_HANELI_uygulama_sifresi` → Az önce oluşturduğun uygulama şifresi (16 karakter, boşluksuz)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=BURAYA_GMAIL_ADRESIN@gmail.com
SMTP_PASS=BURAYA_16_HANELI_uygulama_sifresi
SMTP_FROM=BURAYA_GMAIL_ADRESIN@gmail.com
SMTP_PLAIN_ONLY=false
CONTACT_TO_EMAIL=info@devbarisgul.com
```

Kaydet: **Ctrl+O**, Enter, **Ctrl+X**.

---

## 3. Container’ı yeniden başlat

```bash
docker compose down
docker compose up -d
```

---

## 4. Test et

Sitedeki iletişim formunu doldurup gönder. Mail **info@devbarisgul.com** kutusuna (Outlook’ta gördüğün) düşecek; gönderen sunucu Gmail olacak, 451 hatası olmamalı.
