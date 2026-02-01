# Sunucuda (Docker) Mail Çalışması İçin

Mail gönderimi container **içinde** SMTP ortam değişkenlerinin tanımlı olmasına bağlı. `.env.local` sunucuda container’a kopyalanmıyorsa veya okunmuyorsa form “E-posta gönderilemedi” hatası verir.

## 1. SSH ile sunucuya bağlan

```bash
ssh root@142.93.187.191
```

## 2. Teşhis script’ini çalıştır

Proje sunucuda nerede ise oraya geçip script’i çalıştır:

```bash
cd /root/devbarisgul   # veya projenin gerçek yolu
bash scripts/server-mail-diagnose.sh
```

Bu script:
- `mail.devbarisgul.com:587` erişimini dener
- Çalışan container’ları listeler
- Container içinde `SMTP_*` var mı bakar
- Nasıl env ekleyeceğini örneklerle gösterir

## 3. Docker Compose kullanıyorsan

`docker-compose.yml` (veya `compose.yml`) içinde Next.js uygulamasının servisine **environment** ekle:

```yaml
services:
  web:   # veya app / nextjs / sitenin servis adı
    image: ...
    environment:
      - SMTP_HOST=mail.devbarisgul.com
      - SMTP_PORT=587
      - SMTP_USER=site@devbarisgul.com
      - SMTP_PASS=fq*xm*dd*FKj7ew!
      - SMTP_FROM=site@devbarisgul.com
      - SMTP_SECURE=false
```

Veya env’leri dosyadan okuyacaksan proje kökünde `.env` oluştur (şifre burada, git’e ekleme):

```env
SMTP_HOST=mail.devbarisgul.com
SMTP_PORT=587
SMTP_USER=site@devbarisgul.com
SMTP_PASS=fq*xm*dd*FKj7ew!
SMTP_FROM=site@devbarisgul.com
SMTP_SECURE=false
```

`docker-compose.yml`’de:

```yaml
  web:
    env_file: .env
```

Sonra container’ı yeniden başlat:

```bash
docker compose down
docker compose up -d
```

## 4. Sadece `docker run` kullanıyorsan

Container’ı bu env’lerle başlat (şifreyi kendi değerinle değiştir):

```bash
docker run -d \
  -e SMTP_HOST=mail.devbarisgul.com \
  -e SMTP_PORT=587 \
  -e SMTP_USER=site@devbarisgul.com \
  -e "SMTP_PASS=fq*xm*dd*FKj7ew!" \
  -e SMTP_FROM=site@devbarisgul.com \
  -e SMTP_SECURE=false \
  ... diğer port/volume ayarların ...
```

## 5. Port 587 kapalıysa

Teşhis script’i 587’ye bağlanamıyorsa:

- Sunucu firewall: `ufw allow 587/tcp` veya hosting panelinden 587’yi aç
- Bazı host’lar sadece 465 (SSL) açar; o zaman:

```env
SMTP_PORT=465
SMTP_SECURE=true
```

## 6. Kontrol

Container yeniden başladıktan sonra:

```bash
docker exec <container_adı> printenv | grep SMTP
```

Hepsi görünüyorsa formu tekrar dene. Hâlâ “E-posta gönderilemedi” alırsan, API’nin döndürdüğü hata mesajını (geliştirme modundaki detay) veya `docker logs <container_adı>` çıktısını paylaş.
