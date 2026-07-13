# YOLA Web — Sitio Oficial

> **La IA soberana que vive en tu máquina.**
> Sitio estático de YOLA — agente de IA local con arquitectura soberana.

**Sitio en vivo:** [yolabysayri.com](https://yolabysayri.com) · [rosaldev-sac.github.io/yola-web](https://rosaldev-sac.github.io/yola-web/)

---

## Páginas

| Página | Ruta | Propósito |
|--------|------|-----------|
| **Landing** | `/` | Página principal · Origin ×7 |
| **Arquitectura** | `/tech.html` | Documentación técnica viral |
| **Countdown** | `/countdown.html` | Timer al 24 Sep + registro Origin |
| **Descargas** | `/download.html` | Descarga YOLA OS, YolaVigila, YolaAvisa |
| **Feedback** | `/feedback.html` | Feedback con votación comunitaria |
| **Guardianes** | `/guardianes.html` | Hall of Fame de inversores |
| **Sayri** | `/sayri.html` | Fundador · historia · FAQ |
| **Empresas** | `/empresas.html` | Productos empresariales |
| **Invertir** | `/invertir.html` | Métodos de inversión/donación |
| **EULA** | `/eula.html` | Licencia de uso |
| **Privacidad** | `/privacy.html` | Política de privacidad |
| **Términos** | `/terms.html` | Términos y condiciones |

---

## Stack

- **HTML5** + **CSS3** + **JavaScript vanilla** (sin frameworks)
- **Google Apps Script** como backend serverless
- **Google Sheets** como base de datos
- **GitHub Pages** como hosting con dominio personalizado

## Despliegue

Push a `main` → GitHub Actions despliega automáticamente a GitHub Pages.

```bash
git add .
git commit -m "update"
git push origin main
```

## Documentación

La documentación técnica completa del sitio está en [`docs/DOCUMENTACION.md`](docs/DOCUMENTACION.md):
— Resumen ejecutivo, mapa del sitio, stack, arquitectura, páginas, assets, integraciones, SEO, sistema de diseño, estado y recomendaciones.

## Repositorio

```text
yola-web/
├── .github/workflows/   # CI/CD (GitHub Actions)
├── css/                 # Estilos globales (base.css)
├── js/                  # JavaScript compartido (main.js)
├── downloads/           # Binarios (YolaVigila, YolaAvisa)
├── docs/                # Documentación del sitio
├── index.html           # Landing principal
├── tech.html            # Arquitectura técnica
├── countdown.html       # Countdown Origin
├── download.html        # Página de descargas
├── feedback.html        # Feedback global
├── guardianes.html      # Hall of Fame
├── sayri.html           # Fundador
├── empresas.html        # Productos empresariales
├── invertir.html        # Inversión
├── eula.html            # Licencia EULA
├── privacy.html         # Privacidad
├── terms.html           # Términos
├── apps-script-secured.js  # Backend Google Apps Script
└── CNAME                # yolabysayri.com
```

---

## Ecosistema YOLA

Este es el sitio oficial del ecosistema **YOLA**. Cada proyecto tiene su propio repositorio:

| Proyecto | Descripción |
|----------|-------------|
| [YOLA Engine](https://github.com/SayriDevs/Yola) | Núcleo del ecosistema: motor de agente LLM + OS desktop |
| [YolaAvisa](https://github.com/SayriDevs/YolaAvisa) | App Android que captura notificaciones bancarias |
| [YolaPanel](https://github.com/SayriDevs/YolaPanel) | Dashboard de solo lectura para Google Sheets |
| [YolaVigila](https://github.com/SayriDevs/YolaVigila) | Receptor webhook y dashboard en red local |

---

*SayriDevs · Lima, Perú · 2026*
