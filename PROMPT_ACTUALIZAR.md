# PROMPT — Actualización de contenido web YOLA OS

## Contexto
Sos el agente soberano YOLA. Trabajás en el repo `/home/sayri/Documentos/yola-web/` — un sitio estático de 12 HTML + css/base.css + js/main.js que se publica en GitHub Pages.

## Tu misión
Actualizar TODO el contenido textual de la web para que refleje el estado ACTUAL del código de YOLA OS. El contenido actual está desactualizado — escrito cuando YOLA era una idea, no un software funcionando.

## Paso 1: Auditar el código real
Antes de tocar la web, analizá el código fuente de YOLA OS para entender qué existe HOY:
- Buscá en `~/.yola/` y cualquier otro directorio relevante del proyecto
- Identificá: módulos implementados, fases del sistema, features reales, stack tecnológico actual
- Documentá qué features están en producción vs roadmap vs ideado

## Paso 2: Actualizar cada página
Las 12 páginas necesitan revisión de contenido. Algunas tienen info que ya no aplica.

### index.html
- Hero: descripción de YOLA actualizada con lo que realmente hace
- Sección Jarvis: features que realmente existen
- Sección Tech/Stack: módulos reales del sistema
- Sección Sensorium: qué sensores están activos
- Sección Equity: modelo de propiedad (verificar si cambió)
- CTAs y textos secundarios

### tech.html
- Descripción de cada componente del sistema nervioso
- Comparación YOLA vs el resto (verificar claims)
- Stats y números
- Stack tecnológico real

### countdown.html
- Verificar fecha target (24 de septiembre 2026) — ¿sigue vigente?
- Textos del countdown
- Features listadas para "el 24 de septiembre"
- Timeline de fases

### challenge.html
- Reglas del reto
- Niveles de recompensa
- Claims sobre seguridad

### sayri.html
- Bio de Sayri
- Historia del proyecto
- Inversiones y montos

### download.html
- Plataformas disponibles (¿Linux? ¿Mac? ¿Windows?)
- Requisitos del sistema
- Pasos de instalación

### feedback.html
- Roadmap mostrado
- Estadísticas
- Guardianes listados

### guardianes.html
- Lista de guardianes registrados
- Números y fases

### invertir.html
- Métodos de pago
- Info post-inversión

### Legal (privacy, terms, eula)
- Verificar que la info legal siga vigente

## Paso 3: Mantener la arquitectura
- NO rompás la estructura CSS/JS
- Los estilos están en `css/base.css` (shared) + `<style>` inline (page-specific)
- El JS compartido está en `js/main.js`
- Mobile responsive ya implementado — no tocar media queries
- Español NEUTRO — cero voseo argentino (vos, tenés, podés, elegí, hacé, etc.)
- El cursor custom ya existe — no duplicar

## Paso 4: Entrega
- Hacé los cambios quirúrgicos — solo texto, no estructura
- Verificá que cada HTML siga siendo válido
- Commiteá con mensaje descriptivo
- Entregá un resumen de qué cambió en cada página

## Datos clave del proyecto (verificar si cambiaron)
- Fundador: Sayri (Lima, Perú)
- Repo: github.com/ROSALDEV-SAC/yola-web
- Ledger: github.com/SayriDevs
- WhatsApp: https://chat.whatsapp.com/IrDtmPl1qwHL9dGqrhqKCr
- Yape: 965 759 124
- Interbank: 898 3201606030 / CCI: 0038 9801 3201 6060 3044
- BCP: 1911 1453 5310 22 / Interbancaria: 0021 9111 1453 5310 2259
- YouTube: @sayridev1920

## Restricciones
- NO agregues páginas nuevas (ya las tenemos)
- NO modifiqués el CSS ni el JS
- NO cambies links de navegación ni estructura de nav
- Solo actualizá TEXTOS, stats, features, claims, fechas
- Si un claim ya no es válido, eliminalo o reemplazalo
- Si una feature nueva existe y no está mencionada, agregala
