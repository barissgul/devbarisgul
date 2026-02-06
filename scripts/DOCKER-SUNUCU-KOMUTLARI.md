# Docker ile Sunucuda Çalıştırma (devbarisgul)

## 1. Projeyi sunucuya al

```bash
# Örnek: Git ile
git clone <repo-url> devbarisgul
cd devbarisgul
```

## 2. Ortam değişkenlerini ayarla

```bash
# Örnek .env oluştur (içine SMTP bilgilerini yaz)
cp .env.docker.example .env
nano .env   # veya vim — CONTACT_TO_EMAIL, SMTP_* alanlarını doldur
```

## 3. Build ve çalıştır

```bash
docker compose build
docker compose up -d
```

Uygulama **3000** portunda açılır. Nginx vb. ile 80/443’e yönlendirebilirsin.

## Yararlı komutlar

```bash
# Logları izle
docker compose logs -f web

# Durdur
docker compose down

# Yeniden build edip ayağa kaldır (kod değişince)
docker compose build --no-cache && docker compose up -d
```

## Tek komutla (env hazırsa)

```bash
docker compose up -d --build
```
