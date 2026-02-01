#!/bin/bash
# Sunucuda mail sorununu teşhis etmek için çalıştır: bash server-mail-diagnose.sh
# SSH ile bağlandıktan sonra: cd /path/to/project && bash scripts/server-mail-diagnose.sh

set -e

echo "=== 1. SMTP port erişimi (mail.devbarisgul.com:587) ==="
if command -v nc &>/dev/null; then
  if nc -zv mail.devbarisgul.com 587 2>&1; then
    echo "OK: Port 587 açık."
  else
    echo "UYARI: Port 587 erişilemiyor (firewall veya sunucu engelliyor olabilir)."
  fi
else
  echo "nc yok, atlanıyor. (timeout 3 bash -c 'echo >/dev/tcp/mail.devbarisgul.com/587' 2>/dev/null && echo 'Port açık' || echo 'Port kapalı')"
fi

echo ""
echo "=== 2. Çalışan Docker container'lar ==="
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}" 2>/dev/null || true

echo ""
echo "=== 3. Next.js/Node container içinde SMTP env kontrolü ==="
for name in $(docker ps --format '{{.Names}}' 2>/dev/null); do
  if docker exec "$name" printenv 2>/dev/null | grep -q "NODE\|next\|SMTP"; then
    echo "--- Container: $name ---"
    docker exec "$name" printenv 2>/dev/null | grep -E "SMTP_|NODE_ENV" || echo "(SMTP_* yok)"
    echo ""
  fi
done

echo "=== 4. Örnek: SMTP env'leri container'a ekleme ==="
echo "Docker Compose kullanıyorsanız, docker-compose.yml içinde servise şunu ekleyin:"
echo ""
cat << 'YAML'
  environment:
    - SMTP_HOST=mail.devbarisgul.com
    - SMTP_PORT=587
    - SMTP_USER=site@devbarisgul.com
    - SMTP_PASS=fq*xm*dd*FKj7ew!
    - SMTP_FROM=site@devbarisgul.com
    - SMTP_SECURE=false
YAML
echo ""
echo "Veya .env dosyası kullanın (proje kökünde):"
echo "  env_file: .env"
echo "  (içinde SMTP_HOST=..., SMTP_USER=..., SMTP_PASS=... olsun)"
echo ""
echo "Sadece 'docker run' kullanıyorsanız:"
echo "  docker run -e SMTP_HOST=mail.devbarisgul.com -e SMTP_PORT=587 -e SMTP_USER=site@devbarisgul.com -e SMTP_PASS='...' -e SMTP_FROM=site@devbarisgul.com ..."
echo ""
