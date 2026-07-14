#!/bin/bash
set -euo pipefail

# ═══════════════════════════════════════════════════════════════════════
# YOLA CLI — Instalación universal
# ═══════════════════════════════════════════════════════════════════════
# Uso: curl -fsSL https://yolabysayri.com/install.sh | bash
# O:   curl -fsSL https://yolabysayri.com/install.sh | bash -s -- -b /usr/local/bin
# ═══════════════════════════════════════════════════════════════════════

REPO="yola-cli"
VERSION="v0.1.0"
BASE_URL="https://yolabysayri.com/downloads/$REPO"

# ── Colores ──────────────────────────────────────────────────────────
BOLD='\033[1m'
DIM='\033[2m'
PURPLE='\033[0;35m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# ── Detectar OS/Arch ─────────────────────────────────────────────────
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)

case "$ARCH" in
  x86_64)  ARCH="amd64" ;;
  aarch64|arm64) ARCH="arm64" ;;
  *)
    echo -e "${RED}✖${NC} Arquitectura no soportada: $ARCH"
    exit 1
    ;;
esac

case "$OS" in
  linux)   DIR="linux-$ARCH" ;;
  darwin)  DIR="macos-$ARCH" ;;
  windows) DIR="windows-$ARCH" ;;
  *)
    echo -e "${RED}✖${NC} SO no soportado: $OS"
    exit 1
    ;;
esac

# En Windows, necesitamos .exe
EXT=""
[ "$OS" = "windows" ] && EXT=".exe"

# ── Parsear flags ─────────────────────────────────────────────────────
INSTALL_DIR="/usr/local/bin"
while getopts "b:" opt; do
  case "$opt" in
    b) INSTALL_DIR="$OPTARG" ;;
    *) ;;
  esac
done

# ── Determinar destino ────────────────────────────────────────────────
if [ ! -d "$INSTALL_DIR" ]; then
  # Fallback a ~/.local/bin si /usr/local/bin no existe (macOS sin permisos)
  INSTALL_DIR="$HOME/.local/bin"
  mkdir -p "$INSTALL_DIR"
fi

DEST="$INSTALL_DIR/yola"

# ── Ya instalado? ──────────────────────────────────────────────────────
if [ -f "$DEST" ]; then
  echo -e "${PURPLE}ℹ${NC} yola ya está instalado en $DEST"
  echo -e "   Para actualizar: ${DIM}rm $DEST && curl -fsSL https://yolabysayri.com/install.sh | bash${NC}"
  exit 0
fi

# ── Descargar ──────────────────────────────────────────────────────────
URL="$BASE_URL/$DIR/yola-cli$EXT"
echo -e "${BOLD}⬇  Descargando YOLA CLI ${VERSION}${NC}"
echo -e "   ${DIM}OS:${NC} $OS  ${DIM}Arch:${NC} $ARCH  ${DIM}Destino:${NC} $DEST"
echo ""

TMP_FILE=$(mktemp)
HTTP_CODE=$(curl -fsSL -o "$TMP_FILE" -w "%{http_code}" "$URL" 2>/dev/null || echo "error")

if [ "$HTTP_CODE" != "200" ]; then
  echo -e "${RED}✖${NC} Error de descarga (HTTP $HTTP_CODE)"
  echo -e "   ${DIM}URL:${NC} $URL"
  rm -f "$TMP_FILE"
  exit 1
fi

# ── Instalar ───────────────────────────────────────────────────────────
chmod +x "$TMP_FILE"
mv "$TMP_FILE" "$DEST"

echo -e "${GREEN}✔${NC} Instalado en ${BOLD}$DEST${NC} ($(ls -lh "$DEST" | awk '{print $5}'))"
echo ""

# Verificar que está en PATH
if command -v yola &>/dev/null; then
  echo -e "   Ejecuta ${BOLD}yola${NC} para empezar"
  echo -e "   O ${BOLD}yola serve${NC} para la UI web"
else
  echo -e "   ${DIM}Asegúrate de que $INSTALL_DIR esté en tu PATH${NC}"
  echo -e "   ${DIM}Ejecuta: export PATH=\"\$PATH:$INSTALL_DIR\"${NC}"
fi
