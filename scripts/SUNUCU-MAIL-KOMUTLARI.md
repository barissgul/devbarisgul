# Sunucuda mail için çalıştırılacak komutlar (script dosyası gerekmez)

SSH: `ssh root@142.93.187.191`  
Proje dizini: `cd /home/nextjs-app`

---

## 1. Mevcut durumu kontrol et

```bash
# Container içinde SMTP var mı?
docker ps
docker exec $(docker ps -q --filter "ancestor=*next*" | head -1) printenv | grep SMTP || docker exec $(docker ps -q | head -1) printenv | grep SMTP
```

```bash
# docker-compose servis adını gör
cat docker-compose.yml
```

---

## 2. docker-compose.yml'e SMTP env ekle

Servis adı genelde `app` veya `web`. `docker-compose.yml` içinde `services:` altındaki ilk servisin adını kullan (örn. `app`).

**Seçenek A – nano ile düzenle:**

```bash
nano docker-compose.yml
```

Servis bloğunun içine (örn. `app:` veya `web:` altına, `build:` veya `image:` satırlarından sonra) şunu ekle:

```yaml
    environment:
      - SMTP_HOST=mail.devbarisgul.com
      - SMTP_PORT=587
      - SMTP_USER=site@devbarisgul.com
      - SMTP_PASS=fq*xm*dd*FKj7ew!
      - SMTP_FROM=site@devbarisgul.com
      - SMTP_SECURE=false
```

Kaydet: Ctrl+O, Enter, Ctrl+X.

**Seçenek B – Proje kökünde .env oluştur (şifre dosyada):**

```bash
cat > .env << 'EOF'
SMTP_HOST=mail.devbarisgul.com
SMTP_PORT=587
SMTP_USER=site@devbarisgul.com
SMTP_PASS=fq*xm*dd*FKj7ew!
SMTP_FROM=site@devbarisgul.com
SMTP_SECURE=false
EOF
```

Sonra `nano docker-compose.yml` ile ilgili servise şunu ekle:

```yaml
    env_file: .env
```

---

## 3. Container'ı yeniden başlat

```bash
docker compose down
docker compose up -d
```

veya eski compose sürümü için:

```bash
docker-compose down
docker-compose up -d
```

---

## 4. Env'lerin yüklendiğini kontrol et

```bash
CONTAINER=$(docker ps -q | head -1)
docker exec $CONTAINER printenv | grep SMTP
```

Hepsi görünüyorsa formu tekrar dene.
