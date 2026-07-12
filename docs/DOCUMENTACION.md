# YOLA Web — Documentación Técnica Completa

> **Repositorio:** `yola-web`
> **Dominio:** [yolabysayri.com](https://yolabysayri.com)
> **Hosting:** GitHub Pages (despliegue automático desde `main`)
> **Última actualización:** Julio 2026

---

## Índice

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Mapa del Sitio](#2-mapa-del-sitio)
3. [Stack Tecnológico](#3-stack-tecnológico)
4. [Arquitectura del Sitio](#4-arquitectura-del-sitio)
5. [Páginas y Funcionalidades](#5-páginas-y-funcionalidades)
6. [Assets y Recursos](#6-assets-y-recursos)
7. [Integraciones](#7-integraciones)
8. [SEO y Presencia Web](#8-seo-y-presencia-web)
9. [Sistema de Diseño](#9-sistema-de-diseño)
10. [Estado Actual y Recomendaciones](#10-estado-actual-y-recomendaciones)

---

## 1. Resumen Ejecutivo

**yola-web** es el sitio web estático de YOLA — un agente de IA local/soberano que vive en la máquina del usuario. El sitio funciona como la cara pública del proyecto: presenta el producto, explica su arquitectura técnica, gestiona la comunidad de inversores (Guardianes), y canaliza feedback, registro y descargas.

Construido completamente con HTML, CSS y JavaScript vanilla (sin frameworks), desplegado en GitHub Pages con dominio personalizado. Usa Google Apps Script + Google Sheets como backend gratuito para formularios y votación.

El sitio está en activo desarrollo con 14 páginas HTML que cubren desde la landing principal hasta documentos legales (EULA, términos, privacidad).

---

## 2. Mapa del Sitio

| # | Archivo | Ruta | Propósito | Tipo |
|---|---------|------|-----------|------|
| 1 | `index.html` | `/` | Landing principal. Presentación del producto, hero, características, stats, CTA. | Conversión |
| 2 | `tech.html` | `/tech.html` | Arquitectura técnica detallada. Sistema nervioso, agentes, tools, providers, comparativas. | Informativa |
| 3 | `countdown.html` | `/countdown.html` | Temporizador al 24 de septiembre 2026 + registro Origin ×3.75. | Conversión |
| 4 | `download.html` | `/download.html` | Descarga de YOLA OS, YolaVigila, YolaAvisa con detección automática de SO. | Conversión |
| 5 | `feedback.html` | `/feedback.html` | Sistema de feedback global con votación por categorías. | Interacción |
| 6 | `guardianes.html` | `/guardianes.html` | Hall of Fame de inversores iniciales. Progreso de la causa. | Comunidad |
| 7 | `sayri.html` | `/sayri.html` | Biografía del fundador, historia del proyecto, FAQ. | Institucional |
| 8 | `empresas.html` | `/empresas.html` | Productos empresariales: YolaVigila, YolaAvisa, integraciones. | Comercial |
| 9 | `invertir.html` | `/invertir.html` | Métodos de inversión/donación: crypto, transferencia, YAPE, PayPal. | Conversión |
| 10 | `eula.html` | `/eula.html` | Acuerdo de Licencia de Usuario Final. | Legal |
| 11 | `privacy.html` | `/privacy.html` | Política de privacidad. Sin recolección de datos. | Legal |
| 12 | `terms.html` | `/terms.html` | Términos y condiciones generales. | Legal |
| 13 | `apps-script-secured.js` | — | Código Google Apps Script (backend). Despliegue externo. | Backend |

### Páginas referenciadas pero no encontradas en disco

| Página | Referenciada en | Estado |
|--------|----------------|--------|
| `challenge.html` | `README.md` | **NO EXISTE** — posiblemente planeada o eliminada |
| Página 404 | — | **NO EXISTE** — el sitio no tiene página de error personalizada |

---

## 3. Stack Tecnológico

### Frontend

| Tecnología | Versión / Detalle |
|------------|------------------|
| **HTML5** | Semántico, DOCTYPE moderno, meta tags CSP |
| **CSS3** | Custom properties, Grid, Flexbox, clamp(), animaciones |
| **JavaScript** | Vanilla ES5/ES6 (sin frameworks, sin bundlers) |
| **Fuentes** | Google Fonts: Syne (sans), DM Mono (mono), Fraunces (serif) |
| **Iconos** | SVGs inline (sin librerías externas) |

### Backend (Serverless)

| Componente | Detalle |
|------------|---------|
| **Google Apps Script** | Backend gratuito alojado en Google Cloud |
| **Google Sheets** | Base de datos: hojas `Origin`, `Feedback`, `Votes` |
| **Conexión** | `fetch()` desde JS del cliente a URL pública del script |

### Hosting y Despliegue

| Componente | Detalle |
|------------|---------|
| **Hosting** | GitHub Pages (gh-pages) |
| **Dominio** | `yolabysayri.com` (via CNAME) |
| **CDN** | GitHub Pages (CloudFlare en segundo plano) |
| **CI/CD** | GitHub Actions: push a `main` → deploy automático |
| **SSL** | Automático vía GitHub Pages (Let's Encrypt) |

### Medidas de Seguridad Implementadas

- **Content-Security-Policy** estricto en todas las páginas
- `X-Content-Type-Options: nosniff`
- `referrer: strict-origin-when-cross-origin`
- Sin librerías externas JS (solo fonts)
- Código ofuscado en `apps-script-secured.js` (ofuscación manual)

---

## 4. Arquitectura del Sitio

### Diagrama de Flujo

```
Usuario → Navegador → DNS (yolabysayri.com → GitHub Pages)
                          │
                    [ GitHub Pages CDN ]
                          │
              ┌───────────┼────────────┐
              │           │            │
         index.html   tech.html    countdown.html
         download.html  feedback.html  ...
              │           │            │
              └───────────┼────────────┘
                          │
                   css/base.css (global)
                    js/main.js (global)
                          │
              ┌───────────┘
              │
    [ Google Apps Script Endpoint ]
              │
    [ Google Sheets (DB) ]
```

### Estructura de Archivos

```
yola-web/
├── .github/
│   └── workflows/
│       └── deploy.yml              # Pipeline CI/CD a GitHub Pages
├── css/
│   └── base.css                    # Sistema de diseño global (~22KB)
├── js/
│   └── main.js                     # JS compartido: cursor, nav, scroll (~3KB)
├── downloads/
│   ├── yolavigila/
│   │   ├── yolavigila-darwin-arm64  # Binary macOS ARM
│   │   ├── yolavigila-darwin-x64    # Binary macOS Intel
│   │   ├── yolavigila-linux-x64     # Binary Linux
│   │   └── yolavigila-windows-x64.exe  # Binary Windows
│   ├── yolaavisa.apk               # APK Android
│   ├── yolaavisa.apk.bak           # Backup APK
│   └── yolaavisa.apk.prev          # Versión anterior APK
├── apps-script-secured.js          # Backend Google Apps Script
├── .nojekyll                       # Desactiva Jekyll en GH Pages
├── .gitignore
├── CNAME                           # yolabysayri.com
├── index.html                      # Landing principal
├── download.html                   # Página de descargas
├── empresas.html                   # Productos empresariales
├── eula.html                       # Licencia de uso
├── feedback.html                   # Feedback global
├── guardianes.html                 # Hall of Fame
├── invertir.html                   # Inversión
├── privacy.html                    # Privacidad
├── sayri.html                      # Bio del fundador
├── tech.html                       # Arquitectura técnica
├── terms.html                      # Términos y condiciones
├── countdown.html                  # Countdown Origin
├── PROMPT_ACTUALIZAR.md            # Instrucciones para agente YOLA
├── README.md                       # README del repositorio
├── logoperu.png                    # Logo con banda peruana
└── YAPE_SAYRI.jpeg                 # QR YAPE
```

### Patrón de CSS

Cada página HTML tiene dos capas de estilo:
1. **Global:** `css/base.css` — design tokens, reset, cursor, nav, scroll, tipografía, botones, layout reutilizable.
2. **Específico:** `<style>` inline en el `<head>` de cada página — estilos exclusivos de esa sección.

### Patrón de JavaScript

`js/main.js` se carga en todas las páginas e incluye:
- Detección de dispositivos táctiles (desactiva cursor personalizado)
- Sistema de cursor personalizado (punto + anillo) con seguimiento suave
- Barra de progreso de scroll
- Navegación con cambio de opacidad al scrollear
- Sistema `reveal` para animaciones al hacer scroll (IntersectionObserver)
- Menú móvil hamburguesa
- Contadores animados (stats que se incrementan al entrar al viewport)

Cada página con funcionalidad extra tiene su propio `<script>` inline.

---

## 5. Páginas y Funcionalidades

### 5.1 `index.html` — Landing Principal

**Propósito:** Página de entrada. Presenta YOLA, convence al visitante, lo dirige a acción (registro/descarga/comunidad).

**Secciones:**
- **Nav:** Logo YOLA + status indicator + enlaces + botón comunidad WhatsApp
- **Hero:** Título principal "La IA que vive en tu computadora", subtítulo "Sin nube. Sin permiso. Sin corporaciones." + botones CTA
- **Jarvis Glimpse:** Grid de 6 features interactivos (hover reveal)
- **Sensorium:** Sensores activos del sistema (archivos, terminal, web, código, apps, red)
- **Tech Stack:** Representación visual del stack tecnológico
- **Equity Model:** Modelo de propiedad (49% pool comunitario)
- **Stats:** Contadores animados (agentes activos, tools, líneas de código, providers)
- **Video:** Sección con video promocional embebido
- **Benefits:** Grid de beneficios con iconos SVG
- **Final CTA:** Llamado a la acción final

**Características especiales:**
- Animación de contadores al hacer scroll
- Efecto hover en grid de features
- Diseño oscuro con acentos dorados/cyan

---

### 5.2 `tech.html` — Arquitectura Técnica

**Propósito:** Documentación técnica viral. Explica cómo funciona YOLA por dentro, targeting a developers y técnicos.

**Secciones:**
- **Hero:** "Arquitectura de un agente local de IA"
- **Nervous System:** Sistema en 4 capas: Percepción → Decisión → Tools → Memoria
- **Agents:** Tipos de agente (Code, Audit, Explore, Refactor, Test)
- **Tools:** 20+ herramientas del ecosistema
- **Providers:** 20+ proveedores LLM soportados
- **vs Others:** Comparativa YOLA vs OpenAI Codex, Claude Code, Cursor, Copilot
- **Stats:** Métricas técnicas (precisión tool calling, tiempo medio)
- **Real Stack:** Stack real implementado

**Características especiales:**
- Tabla comparativa competitiva
- Arquitectura en capas
- Datos técnicos concretos

---

### 5.3 `countdown.html` — Origin Countdown

**Propósito:** Generar urgencia para el registro temprano (Origin ×3.75) antes del 24 de septiembre 2026.

**Secciones:**
- **Hero:** Countdown timer (días, horas, minutos, segundos) en tiempo real
- **CTA:** Botón de registro con formulario
- **Timeline:** Fases del proyecto timeline visual
- **Beneficios:** Grid de beneficios por registrarse antes del deadline

**Características especiales:**
- Temporizador JS en tiempo real
- Diseño de alta urgencia visual
- Formulario conectado a Google Apps Script

---

### 5.4 `download.html` — Descargas

**Propósito:** Canal de distribución de los productos YOLA.

**Secciones:**
- **Hero:** "Descarga YOLA. Tu IA, tu máquina."
- **OS Detection:** Cards por SO (Linux, Windows, macOS) con detección automática
- **YOLA OS:** Descarga principal del sistema operativo IA
- **YolaVigila:** Herramienta de seguridad, binarios para 4 plataformas
- **YolaAvisa:** APK Android para alertas
- **Tutorial:** Instrucciones de instalación paso a paso

**Características especiales:**
- Detección automática de sistema operativo via JS (`navigator.userAgent`)
- Cards con arquitectura visual clara
- Enlaces directos a binarios en `downloads/`

---

### 5.5 `feedback.html` — Feedback Global

**Propósito:** Sistema de votación comunitaria para priorizar features.

**Secciones:**
- **Hero:** "Voz de los Guardianes"
- **Filters:** Filtros por categoría (bug, idea, mejora, crítica)
- **Feedback List:** Lista de items con votos (upvote)
- **Submit Form:** Formulario para enviar nuevo feedback

**Características especiales:**
- Conexión a Google Apps Script (POST)
- Sistema de votos persistente en Google Sheets
- Filtros por categoría con animación

---

### 5.6 `guardianes.html` — Hall of Fame

**Propósito:** Reconocimiento público a los inversores iniciales del pool comunitario.

**Secciones:**
- **Hero:** "Los que creyeron primero"
- **Progress Bar:** Medidor de progreso de recaudación
- **Hall of Fame:** Grid de cards con nombre, quote y contribución
- **Join CTA:** Botón para unirse como Guardian

---

### 5.7 `sayri.html` — Fundador

**Propósito:** Humanizar el proyecto, conectar con la audiencia.

**Secciones:**
- **Hero:** "El humano detrás de YOLA"
- **Story:** Historia de Sayri, el proyecto, filosofía
- **FAQ:** Preguntas frecuentes sobre el fundador y el proyecto

---

### 5.8 `empresas.html` — Productos Empresariales

**Propósito:** Ofrecer soluciones de IA a empresas.

**Secciones:**
- **Productos:** YolaVigila (security agent), YolaAvisa (alert system)
- **Integraciones:** Sistemas compatibles
- **Contacto:** Formas de contacto empresarial

---

### 5.9 `invertir.html` — Inversión

**Propósito:** Canalizar inversiones/donaciones.

**Secciones:**
- **Métodos:** Crypto (BTC, ETH, SOL), Transferencia bancaria, YAPE, PayPal
- **Niveles de recompensa:** Tabla por monto invertido
- **Disclaimer:** Avisos legales

---

### 5.10-5.12 Páginas Legales

| Página | Contenido |
|--------|-----------|
| `eula.html` | 6 cláusulas: licencia, propiedad intelectual, guardianes, limitaciones, terminación, ley aplicable |
| `privacy.html` | Sin recolección, procesamiento local, no cookies, no tracking |
| `terms.html` | 10 secciones: aceptación, licencia, propiedad, pagos, cuentas, conducta, contenido, links, cambios, contacto |

---

## 6. Assets y Recursos

### Imágenes

| Archivo | Formato | Propósito |
|---------|---------|-----------|
| `logoperu.png` | PNG | Logo YOLA con banda rojiblanca peruana (identidad visual) |
| `YAPE_SAYRI.jpeg` | JPEG | Código QR para pagos vía YAPE (Perú) |

### Descargas

| Archivo | Tipo | Plataforma |
|---------|------|------------|
| `downloads/yolavigila/yolavigila-darwin-arm64` | Binary | macOS Apple Silicon |
| `downloads/yolavigila/yolavigila-darwin-x64` | Binary | macOS Intel |
| `downloads/yolavigila/yolavigila-linux-x64` | Binary | Linux x86_64 |
| `downloads/yolavigila/yolavigila-windows-x64.exe` | Binary | Windows x86_64 |
| `downloads/yolaavisa.apk` | APK | Android |
| `downloads/yolaavisa.apk.bak` | APK | Backup |
| `downloads/yolaavisa.apk.prev` | APK | Versión anterior |

### Archivos de Configuración

| Archivo | Propósito |
|---------|-----------|
| `CNAME` | `yolabysayri.com` — dominio personalizado |
| `.nojekyll` | Desactiva el motor Jekyll de GitHub Pages |
| `.gitignore` | Ignora `.DS_Store`, `node_modules/`, `.next/`, `out/`, `*.log` |

---

## 7. Integraciones

### 7.1 Google Apps Script (Backend)

**Archivo:** `apps-script-secured.js`

Backend serverless que recibe peticiones POST desde el frontend y escribe en Google Sheets. Maneja 3 tipos de datos:

| Tipo | Sheet | Campos |
|------|-------|--------|
| `origin_registration` | Origin | doc, email, payment, date, timestamp, phase, multiplier |
| `feedback` | Feedback | id, name, title, desc, cat, date |
| `vote` | Votes | feedbackId, voter, value, date |

**Nota:** El código está ofuscado manualmente (nombres de variables acortados, estructura compacta). No usa dependencias externas.

### 7.2 Métodos de Pago

| Método | Tipo | Región |
|--------|------|--------|
| Bitcoin (BTC) | Crypto | Global |
| Ethereum (ETH) | Crypto | Global |
| Solana (SOL) | Crypto | Global |
| Transferencia bancaria | Fiat | Perú |
| YAPE | QR | Perú |
| PayPal | Fiat | Global |

### 7.3 Comunidad

| Plataforma | Enlace | Propósito |
|------------|--------|-----------|
| WhatsApp | `chat.whatsapp.com/IrDtmPl1qwHL9dGqrhqKCr` | Comunidad principal |

### 7.4 Despliegue Continuo

GitHub Actions workflow en `.github/workflows/deploy.yml`:
- **Trigger:** Push a `main` o dispatch manual
- **Acción:** Upload completo del repo como artifact → Deploy a GitHub Pages
- **Permisos:** `contents: read`, `pages: write`, `id-token: write`

---

## 8. SEO y Presencia Web

### Dominio
- **Custom domain:** `yolabysayri.com` (via CNAME)
- **GitHub Pages fallback:** `rosaldev-sac.github.io/yola-web`

### Meta Tags Implementadas

Todas las páginas tienen:
- `meta charset="UTF-8"`
- `meta viewport` (responsive)
- `meta description` (única por página)
- `meta theme-color` (#050505)
- Open Graph: `og:title`, `og:description`

### Content-Security-Policy

Todas las páginas usan CSP estricto:
```
default-src 'self' https:
script-src 'self' 'unsafe-inline'
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
font-src https://fonts.gstatic.com
img-src 'self' data: https:
frame-src 'none'
```

### Performance

- **Sin frameworks JS** — zero dependency overhead
- **CSS minificado** manualmente (todo en una línea por regla)
- **Google Fonts** con `preconnect` y `display=swap`
- **Sin imágenes externas** excepto fonts
- **Inline styles** por página evita múltiples solicitudes CSS

### Carencias SEO Identificadas

- ❌ No hay `sitemap.xml`
- ❌ No hay `robots.txt`
- ❌ No hay `404.html` personalizada
- ❌ No hay JSON-LD / schema.org structured data
- ❌ No hay etiquetas `hreflang`
- ❌ No hay etiquetas `canonical` (aunque el dominio es único)
- ⚠️ `challenge.html` referenciada en README pero no existe (broken link potencial)

---

## 9. Sistema de Diseño

### Tokens de Diseño (`css/base.css`)

```css
:root {
    --bg: #050505;              /* Fondo principal */
    --s1: #0a0a0a;              /* Superficie 1 */
    --s2: #111;                 /* Superficie 2 */
    --s3: #1a1a1a;              /* Superficie 3 */
    --border: rgba(255,255,255,.05);   /* Borde sutil */
    --border2: rgba(255,255,255,.08);  /* Borde visible */
    --gold: #b8932a;            /* Dorado principal */
    --gold-l: #d4ab47;          /* Dorado claro */
    --text: #ede9e0;            /* Texto principal */
    --text-dim: #5a5650;        /* Texto apagado */
    --text-mid: #8a8278;        /* Texto medio */
    --cyan: #3eb8c0;            /* Cyan acento */
    --green: #3fa866;           /* Verde éxito */
    --red: #c04040;             /* Rojo error */
    --purple: #8b5cf6;          /* Púrpura */
    --blue: #3b82f6;            /* Azul */
    --amber: #d4ab47;           /* Ámbar */
}
```

### Paleta de Color

- **Fondo:** #050505 (negro absoluto)
- **Texto:** #ede9e0 (crema claro)
- **Acento principal:** #b8932a (dorado) — transmite soberanía, valor
- **Acento secundario:** #3eb8c0 (cyan) — transmite tecnología, IA
- **Verde:** #3fa866 — éxito, comunidad, online
- **Rojo:** #c04040 — errores, alertas

### Tipografía

| Fuente | Uso | Peso |
|--------|-----|------|
| Syne | Headings, body (sans-serif) | 400, 700, 800 |
| DM Mono | Código, metadata, tags (mono) | 300, 400, 500 |
| Fraunces | Citas, énfasis especial (serif) | 300, 400 italic |

### Componentes Reutilizables

| Componente | Descripción |
|------------|-------------|
| **Custom Cursor** | Punto dorado + anillo translúcido (solo desktop) |
| **Nav** | Logo + status indicator + enlaces + hamburguesa mobile |
| **Scroll Progress** | Barra delgada en top que avanza con el scroll |
| **Reveal** | Animación fade-in al entrar al viewport |
| **Buttons** | Variantes: primary (gold), secondary, green, danger, ghost |
| **Cards** | Tarjetas con borde sutil, hover glow, glassmorphism |
| **Grid** | Layout responsivo con CSS Grid |
| **Auras** | Elementos decorativos con radial-gradient |

---

## 10. Estado Actual y Recomendaciones

### Estado General: ✅ EN PRODUCCIÓN

El sitio es funcional, está desplegado y operativo. Sin embargo, se identificaron áreas de mejora:

### Hallazgos Críticos

1. **`challenge.html` no existe** en disco pero está referenciado en el README. Posible página planeada o eliminada. Podría generar 404 si se enlaza desde algún lado.

2. **Sin página 404 personalizada.** GitHub Pages tiene una 404 genérica; una página 404 personalizada mejoraría la experiencia.

3. **Archivos residuo:** `yolaavisa.apk.bak` y `yolaavisa.apk.prev` probablemente deberían limpiarse (no se referencian desde ningún HTML).

4. **Código Google Apps Script ofuscado** — `apps-script-secured.js` es difícil de mantener. Sería mejor mantener una versión limpia como fuente de verdad y ofuscar en deploy.

### Recomendaciones Técnicas

| Prioridad | Recomendación | Impacto |
|-----------|---------------|---------|
| Alta | Crear `robots.txt` y `sitemap.xml` | SEO |
| Alta | Crear página `404.html` personalizada | UX |
| Media | Limpiar archivos `.bak` y `.prev` | Higiene |
| Media | Migrar a versionado semántico de assets (cache busting) | Performance |
| Media | Unificar meta tags comunes en un partial (si se usa build step) | Mantenibilidad |
| Baja | Agregar JSON-LD para rich snippets | SEO |
| Baja | Evaluar lazy loading en imágenes y SVGs grandes | Performance |
| Baja | Agregar analytics opcional (sin violar privacidad) | Métricas |

### Observaciones de Contenido

- El contenido de las páginas está en español (Perú), alineado con la audiencia objetivo.
- El tono es directo, disruptivo, contra-cultural (vs grandes corporaciones de IA).
- Los claims técnicos en `tech.html` son verificables contra el código real de YOLA OS.
- `PROMPT_ACTUALIZAR.md` indica que el contenido fue generado/editado por un agente YOLA, lo cual es consistente con la naturaleza del proyecto.

---

## Apéndice A: Mapa de Navegación

```
                          ┌─────────────┐
                          │  index.html  │
                          │  (Landing)   │
                          └──────┬──────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
          ▼                      ▼                      ▼
   ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
   │  tech.html  │       │download.html│       │countdown.html│
   │(Arquitectura)│       │ (Descargas) │       │  (Origin)   │
   └─────────────┘       └─────────────┘       └─────────────┘
          │                      │                      │
          ▼                      ▼                      ▼
   ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
   │feedback.html│       │guardianes.html│     │ sayri.html  │
   │ (Feedback)  │       │  (Hall of Fame)│    │ (Fundador)  │
   └─────────────┘       └─────────────┘       └─────────────┘
          │                      │                      │
          ▼                      ▼                      ▼
   ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
   │empresas.html│       │invertir.html│       │  eula.html  │
   │(Empresarial)│       │ (Inversión) │       │  (Licencia) │
   └─────────────┘       └─────────────┘       └─────────────┘
          │                      │                      │
          ▼                      ▼                      ▼
   ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
   │privacy.html │       │ terms.html  │       │             │
   │(Privacidad) │       │  (Términos) │       │  404.html   │
   └─────────────┘       └─────────────┘       │ (NO EXISTE) │
                                               └─────────────┘
```

## Apéndice B: Tamaños de Archivos

| Archivo | Tamaño (aprox.) |
|---------|-----------------|
| `index.html` | ~44 KB |
| `tech.html` | ~49 KB |
| `feedback.html` | ~38 KB |
| `countdown.html` | ~35 KB |
| `download.html` | ~26 KB |
| `empresas.html` | ~19 KB |
| `invertir.html` | ~17 KB |
| `sayri.html` | ~19 KB |
| `guardianes.html` | ~11 KB |
| `eula.html` | ~16 KB |
| `privacy.html` | ~7 KB |
| `terms.html` | ~7 KB |
| `css/base.css` | ~22 KB |
| `js/main.js` | ~3 KB |
| `apps-script-secured.js` | ~4 KB |
| `logoperu.png` | ~(binary) |
| `YAPE_SAYRI.jpeg` | ~(binary) |

---

*Documentación generada el 11 de julio de 2026 por YOLA (agente de ingeniería).*
*Repositorio: [github.com/rosaldev-sac/yola-web](https://github.com/rosaldev-sac/yola-web)*
