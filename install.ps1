# YOLA CLI — Instalación universal para Windows (PowerShell)
# Uso: iwr -useb https://yolabysayri.com/install.ps1 | iex

$VERSION = "v0.1.0"
$BASE = "https://yolabysayri.com/downloads/yola-cli"

# Detectar arquitectura
$ARCH = if ([Environment]::Is64BitOperatingSystem) { "amd64" } else { "arm64" }
$DIR = "windows-$ARCH"
$URL = "$BASE/$DIR/yola-cli.exe"

# Destino
$DEST = "$env:LOCALAPPDATA\yola"
if (!(Test-Path $DEST)) { New-Item -Type Directory $DEST -Force | Out-Null }
$FILE = "$DEST\yola-cli.exe"

# Verificar si ya existe
if (Test-Path $FILE) {
    Write-Host "ℹ yola ya está instalado en $FILE" -ForegroundColor Magenta
    Write-Host "   Para actualizar: Remove-Item '$FILE' y ejecuta el comando de nuevo"
    exit 0
}

# Descargar
Write-Host "⬇ Descargando YOLA CLI $VERSION" -ForegroundColor White
Write-Host "   $URL"
try {
    Invoke-WebRequest -Uri $URL -OutFile $FILE -ErrorAction Stop
} catch {
    Write-Host "✖ Error de descarga: $_" -ForegroundColor Red
    exit 1
}

Write-Host "✔ Instalado en $FILE" -ForegroundColor Green

# Agregar al PATH del usuario
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($currentPath -notlike "*$DEST*") {
    [Environment]::SetEnvironmentVariable("Path", "$currentPath;$DEST", "User")
    $env:Path = "$env:Path;$DEST"
    Write-Host "   ✅ $DEST agregado al PATH de usuario"
}

Write-Host ""
Write-Host "   Ejecuta 'yola-cli' para empezar" -ForegroundColor Green
Write-Host "   O 'yola-cli serve' para la UI web"
