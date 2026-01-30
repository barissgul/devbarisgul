#!/bin/bash
# VDS sunucuda SSH ile çalıştırın: bash setup-vds.sh
# Node.js, PM2, Nginx kurar. Proje kurulumunu siz yaparsınız (git clone veya rsync).

set -e
echo "=== VDS Kurulum Scripti (Ubuntu/Debian) ==="

# Root değilse sudo kullan
SUDO=""
if [ "$(id -u)" -ne 0 ]; then
  SUDO="sudo"
fi

echo "[1/5] Sistem güncelleniyor..."
$SUDO apt update && $SUDO apt upgrade -y
$SUDO apt install -y curl git build-essential

echo "[2/5] Node.js 20 kuruluyor..."
if ! command -v node &> /dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | $SUDO -E bash -
  $SUDO apt install -y nodejs
fi
node -v
npm -v

echo "[3/5] PM2 kuruluyor..."
if ! command -v pm2 &> /dev/null; then
  $SUDO npm install -g pm2
fi
pm2 -v

echo "[4/5] Nginx kuruluyor..."
$SUDO apt install -y nginx

echo "[5/5] Proje dizini oluşturuluyor..."
mkdir -p ~/devbarisgul
cd ~/devbarisgul

echo ""
echo "=== Kurulum tamamlandı ==="
echo ""
echo "Şimdi yapmanız gerekenler:"
echo "1) Projeyi bu sunucuya getirin:"
echo "   - GitHub'tan: git clone https://github.com/KULLANICI/REPO.git ~/devbarisgul"
echo "   - Veya bilgisayarınızdan: rsync -avz --exclude node_modules --exclude .next ./ kullanici@SUNUCU_IP:~/devbarisgul/"
echo ""
echo "2) Sunucuda proje klasöründe:"
echo "   cd ~/devbarisgul"
echo "   npm install"
echo "   npm run build"
echo "   pm2 start npm --name devbarisgul -- start"
echo "   pm2 startup && pm2 save"
echo ""
echo "3) Nginx ayarı için DEPLOY-VDS.md dosyasındaki Nginx bölümünü uygulayın."
echo "   (sudo nano /etc/nginx/sites-available/devbarisgul)"
echo ""
