# Documento de Traspaso — Sitio de Eric Gustafson

**Fecha:** 4 de septiembre, 2026 (revisado y actualizado el mismo día por Claude Code tras cotejar contra el estado real del repo, el historial de Actions en GitHub y el sitio en vivo)
**Preparado por:** Luis Alberto Gálvez López (editor / gestor del proyecto)
**Proyecto:** Sitio de autor para Eric Gustafson, promoción de *Mexico Viking*

> **Nota de la revisión:** este documento describía un estado *anterior* al ya avanzado en el repo — varios puntos marcados como "pendiente" ya estaban implementados y en vivo. Las secciones de abajo fueron corregidas contra el código real, el log de `git`, el historial de GitHub Actions (vía API) y una consulta directa al sitio publicado. Los cambios de fondo respecto a la versión original están marcados inline.

---

## 1. Contexto

Sitio de autor para Eric Gustafson, construido para dar salida comercial a *Mexico Viking* (novela, KDP) vía Amazon, presentar su bibliografía completa, y dar una vía de contacto directa. Eric es el autor; Luis coordina el proyecto y ejecuta cambios técnicos con ayuda de Claude Code (Linux) y Claude (chat, para planeación/contenido).

**Objetivos originales del sitio:**
- Vía clara de compra en Amazon
- Identidad visual propia, separada del diseño de portada del libro
- (Futuro) mapa interactivo de los viajes de Nils, el protagonista

---

## 2. Estado actual — Infraestructura

| Elemento | Estado |
|---|---|
| **Repo** | `github.com/thx1131/ericwgustafson-website` — activo, main branch |
| **Hosting** | Cloudflare Pages, proyecto `ericwgustafson-website` |
| **URL en vivo** | https://ericwgustafson-website.pages.dev/ — confirmado accesible (HTTP 200) y con el contenido más reciente |
| **Dominio propio** | Aún no configurado — `ericwgustafson.com` no resuelve DNS todavía (confirmado) |
| **Stack** | Astro (`^7.2.0`), sitio 100% estático (`output: 'static'`), sin adaptador SSR |
| **CI/CD** | **Dos mecanismos distintos y desalineados hasta hoy** — ver nota abajo. Ya corregido. |
| **Editor asistente** | Claude Code corriendo en Linux, conectado al repo local |

**Nota técnica resuelta:** se descartó el adaptador `@astrojs/cloudflare` por generar conflicto de versiones con Astro; el sitio no necesita SSR para su alcance actual (bio, contacto, publicaciones son contenido estático).

**⚠️ Corrección importante sobre CI/CD (no reflejada en la versión original de este documento):**

Hay/había **dos vías de deploy independientes**:

1. **Integración nativa Git de Cloudflare Pages** (configurada directo en el dashboard de Cloudflare, fuera de este repo) → apunta al proyecto `ericwgustafson-website` → **esta es la que de verdad sirve el sitio en vivo**, y sí ha estado funcionando en cada push.
2. **GitHub Action** (`.github/workflows/deploy.yml`, usa `wrangler-action`) → **falló en el 100% de sus ejecuciones (13/13) desde el primer commit**, confirmado vía la API de GitHub Actions. Causa raíz: fijaba Node 18, pero Astro 7 requiere Node ≥22.12 — el build fallaba antes de siquiera intentar el deploy. Además apuntaba a un proyecto de Cloudflare distinto (`ericwgustafson`, sin "-website"), cuyo subdominio `.pages.dev` ni siquiera resuelve — probablemente nunca existió.

El sitio en vivo nunca estuvo en riesgo porque la vía 1 seguía funcionando en silencio, pero la vía 2 llevaba meses marcando "failure" en cada commit sin que nadie lo notara ni afectara nada visible.

**Ya corregido** (commit `13befee`, "Fix broken CI deploy workflow"):
- `node-version` del workflow: `18` → `22`
- `--project-name` del wrangler deploy: `ericwgustafson` → `ericwgustafson-website` (también corregido en el comando manual de `README.md`)
- Se agregó `"engines": { "node": ">=22.12.0" }` a `package.json` para que un futuro downgrade de Node falle explícitamente en vez de romper CI en silencio

Con esto, ambas vías de deploy apuntan al mismo proyecto real y el Action debería empezar a pasar.

---

## 3. Lo que se ha avanzado (construido y en vivo ahora mismo)

Confirmado revisando el código actual del repo (esta sección estaba desactualizada — describía un estado anterior al rediseño; corregida):

- ✅ Estructura base Astro funcionando (`Layout.astro`, `Header.astro`, `Footer.astro`, `Nav.astro`)
- ✅ 4 páginas construidas, **ya en inglés**: Home (`index.astro`), Bio (`bio.astro`), Publications (`publications.astro`), Contact (`contact.astro`) — los nombres de archivo y rutas ya son en inglés, no `publicaciones.astro`/`contacto.astro`
- ✅ **Sistema de diseño editorial ya aplicado** (no es el look azul/dorado corporativo): paleta crema (`#FAF8F4`) + marino desaturado (`#1F3A52`) + acento ocre (`#9C6B30`), tipografía Newsreader (headings) + Inter (body), sin sombras ni border-radius grandes — el `BRIEF_CLAUDE_CODE_REDISENO.md` ya se ejecutó por completo
- ✅ Componente `PublicationCard.astro` (ya no `CardLibro.astro`) con 3 estados de disponibilidad (`available`/`inquire`/`out_of_print`), no el booleano viejo
- ✅ Página de Publications reestructurada en dos secciones — "Books" (cards grandes, solo `available`) y "Selected Writings & Contributions" (las otras 9, ordenadas por año) — el `ADDENDUM_PUBLICATIONS.md` ya se ejecutó
- ✅ `publications.json` con las 11 publicaciones reales ya es el archivo en uso (no quedan referencias a un `libros.json` viejo)
- ✅ Bio con el texto real de Eric ya integrado en `bio.astro` (educación, ASFM, ITESM, FEMSA, deportes) — no es contenido placeholder
- ✅ Las 11 publicaciones ya tienen portada (las últimas 9 se subieron y conectaron el 2026-09-04)
- ✅ Logo de marca en header + favicon
- ✅ Página de Contacto con mailto + WhatsApp (estructura lista, pendiente confirmar número real de WhatsApp)
- ⚠️ **Pipeline de deploy — corregido hoy, ver nota de la sección 2.** No estaba "100% funcional y probado" como decía la versión original de este documento: el GitHub Action llevaba 13/13 ejecuciones fallidas desde el commit inicial. El sitio seguía en línea solo gracias a la integración nativa de Cloudflare. Ya se corrigió Node 18→22 y el nombre de proyecto; **queda pendiente configurar los secrets de Cloudflare en GitHub para que el Action llegue a desplegar** (ver sección 5).

**Idioma actual del sitio en vivo:** **inglés**, confirmado en el HTML servido (`<html lang="en">`, nav "Home/Biography/Publications/Contact"). La traducción ya no está pendiente.

**Foto de Eric — peor que lo reportado:** `bio.astro` referencia `/images/eric-gustafson.jpg`, que **no existe** en `public/images/`. No es un tema de "baja resolución" — hoy mismo la imagen sale rota en el sitio en vivo. Sigue siendo el punto 🔴 más visible pendiente.

---

## 4. Contenido y datos preparados — estado real de integración

Esta sección estaba desactualizada casi por completo: casi todo lo que decía "pendiente de ejecutarse" ya está aplicado en el repo. Corregida:

| Archivo | Contenido | Estado real (verificado en el código) |
|---|---|---|
| `DESIGN_SYSTEM_EDITORIAL.md` | Paleta crema/marino desaturado/ocre, tipografía Newsreader + Inter, componentes sin sombras | ✅ **Ya aplicado** en `src/styles/global.css` |
| `publications.json` | Bibliografía completa: 11 publicaciones con 3 estados (`available`/`inquire`/`out_of_print`) | ✅ **Ya es el archivo en uso real** por `publications.astro`; no queda `libros.json` |
| `BIO_CONTENT.md` | Datos de Eric (educación, ASFM/ITESM, negocios, deportes) + texto de bio | ✅ **Ya integrado** en `bio.astro`, texto real visible en el sitio |
| `joe-and-running-bear-cover.jpg` | Portada de *Joe and Running Bear* | ✅ **Ya está subida** a `public/images/` |
| `BRIEF_CLAUDE_CODE_REDISENO.md` | Rediseño editorial + traducción de UI a inglés | ✅ **Ya ejecutado por completo** |
| `ADDENDUM_PUBLICATIONS.md` | Restructurar Publications en "Books" / "Selected Writings" con 3 estados | ✅ **Ya ejecutado** — con una desviación menor: el addendum pedía la sección "Selected Writings" como lista bibliográfica *sin* imágenes; la implementación real usa cards compactas (`PublicationCard compact`) que sí muestran imagen/placeholder, y el 2026-09-04 se les agregó portada real a las 9 entradas de esa sección |
| `eric-gustafson-photo.jpg` | Foto de Eric recortada de la contraportada de *Joe and Running Bear* | ❌ **No está en el repo.** `bio.astro` referencia `/images/eric-gustafson.jpg`, archivo inexistente — la imagen sale rota en el sitio en vivo hoy mismo. Sigue siendo el pendiente real más visible. |

---

## 5. Backlog / Pendientes (priorizado)

*(Corregida — la mayoría de los puntos 🔴 originales ya estaban resueltos; se archivaron abajo y se agregó el hallazgo real de CI/CD.)*

### 🔴 Crítico / siguiente paso inmediato
1. **Configurar los secrets de Cloudflare en GitHub** (`Settings → Secrets and variables → Actions` del repo) para que el GitHub Action de deploy funcione de punta a punta: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, y opcionalmente `AUTHOR_EMAIL`/`WHATSAPP_NUMBER` (hoy los 4 están vacíos — confirmado vía API, `total_count: 0`). Sin esto, el Action seguirá fallando en el paso de deploy aunque el build ya compile. El sitio en vivo no depende de esto (lo sirve la integración nativa de Cloudflare), pero mientras no se resuelva, cada push seguirá marcando ❌ en GitHub — hay que decidir si vale la pena mantener este Action redundante o eliminarlo.
2. **Subir una foto real de Eric** a `public/images/eric-gustafson.jpg` (la ruta ya está referenciada en `bio.astro`, solo falta el archivo — hoy sale rota en el sitio en vivo)

### 🟡 Importante, no bloqueante
3. **CMS headless (Decap CMS)** — aún no se ha instalado. Definir primero: ¿quién edita? (¿Eric directo, requiere GitHub, o alternativa con login simple?). Alcance propuesto: editable = textos de bio, datos de publicaciones (precio, estado, links, portadas). NO editable vía CMS = colores/tipografía (decisión de diseño fija)
4. **Link de Amazon Kindle** faltante para *Mexico Viking* y *Joe and Running Bear* (solo se tienen paperback confirmados; Kindle de Mexico Viking es placeholder `XXXXX`)
5. **Confirmar email y número de WhatsApp definitivos** para la página de Contacto (aún placeholder en `.env.example`)
6. **Dominio propio** — apuntar `ericwgustafson.com` a Cloudflare Pages (confirmado: hoy no resuelve DNS, sigue viviendo solo en `.pages.dev`)
7. **Sección "Selected Writings" con imágenes** — decidir si se deja como cards con portada (estado actual, ya con las 9 portadas subidas) o se vuelve a la lista bibliográfica sin imágenes que pedía el `ADDENDUM_PUBLICATIONS.md` original

### ✅ Ya resuelto (archivado — estaba mal marcado como pendiente en la versión anterior de este documento)
- ~~Ejecutar el rediseño editorial~~ — hecho, ver sección 3
- ~~Reemplazar `libros.json` por `publications.json`~~ — hecho
- ~~Subir `joe-and-running-bear-cover.jpg`~~ — hecho
- ~~Integrar texto de bio desde `BIO_CONTENT.md`~~ — hecho
- ~~Traducir la UI a inglés~~ — hecho
- ~~Subir portadas de las 9 publicaciones restantes~~ — hecho el 2026-09-04

### 🟢 Futuro / fase 2
10. **Mapa interactivo de los viajes de Nils** — idea original del proyecto, sin diseño ni datos de coordenadas todavía. Requiere definir fuente de datos (¿capítulos del libro anotados con lugares/fechas?)
11. Posible ampliación de página "Selected Writings" con más detalle por publicación si Eric quiere

### ⚠️ Fuera del sitio, pero relacionado (nivel libro/KDP)
12. **Conflicto sin resolver: subtítulo "Memoir" vs. clasificación de ficción en KDP.** El subtítulo formal de portada dice *"A Viking's Memoir on Mexico's Environmental Challenges"*, pero el libro se clasifica como ficción en KDP porque Eric no quiere ser identificado públicamente con el protagonista (Nils). Este subtítulo ya se usó en `publications.json` tal cual viene en portada — si se resuelve el conflicto a nivel de portada/KDP, hay que actualizar también el sitio (un solo campo en `publications.json`, cambio menor)
13. Kindle: posible necesidad de marcar `Cap_Titulo` con Outline Level 1 para TOC navegable (pendiente de otras conversaciones sobre el libro, no bloquea el sitio)

---

## 6. Decisiones clave y su razón

| Decisión | Razón |
|---|---|
| Astro estático, sin adaptador SSR | El sitio no necesita server-side rendering (contenido no dinámico por usuario); reduce complejidad y evitó un conflicto real de dependencias en el primer deploy |
| Rediseño de "corporativo azul/dorado" a "editorial crema/marino" | El primer resultado de Claude Code se sintió como landing comercial; Eric/Luis buscan tono de editorial literaria seria (referencia: Anagrama, The Paris Review) |
| Sitio 100% en inglés | Decisión explícita de Luis — el sitio no es bilingüe, mercado objetivo es en inglés |
| Publications con 3 estados en vez de solo disponible/agotado | La bibliografía real de Eric incluye reportes técnicos/institucionales que no se venden pero sí se pueden consultar bajo petición — el esquema binario no alcanzaba |
| CMS propuesto: Decap CMS (Git-based) | Gratis, sin servidor extra, alineado con el enfoque de software libre del proyecto; permite a Eric editar contenido sin tocar código, sin costo recurrente tipo WordPress |
| Colores/tipografía NO editables vía CMS | Para proteger la coherencia de la identidad visual — cambiar diseño es decisión editorial puntual, no contenido de uso diario |

---

## 7. Riesgos / preguntas abiertas

- ¿Quién va a editar el CMS cuando se instale — Eric directamente (requiere cuenta GitHub) o solo Luis?
- El subtítulo "Memoir" del sitio hereda el conflicto de clasificación del libro — no es urgente pero puede generar inconsistencia si se resuelve tarde
- Falta confirmar disponibilidad real de Kindle para ambos libros (actualmente solo paperback confirmado)
- **Falta foto de Eric por completo** en el sitio en vivo — no es un problema de resolución, es una imagen rota (404) hoy mismo
- **El remoto `origin` de este repo local tiene el token personal de GitHub de Luis embebido en texto plano** en `.git/config` (`https://thx1131:ghp_...@github.com/...`). Cualquiera con acceso a esta máquina/repo local puede leerlo. Recomendado: revocar ese token y reconfigurar el remoto con un credential helper en vez de la URL. (Señalado también en la sesión de Claude Code del 2026-09-04, sección de git.)
- ¿Vale la pena mantener el GitHub Action de deploy si la integración nativa de Cloudflare ya cubre el despliegue? Si se decide que sí, falta cargar los secrets de Cloudflare en GitHub (ver sección 5, punto 🔴 1). Si se decide que no, se puede simplificar borrando `.github/workflows/deploy.yml` para dejar de depender de dos mecanismos en paralelo.

---

## 8. Accesos y recursos

- **Repo GitHub**: `github.com/thx1131/ericwgustafson-website`
- **Cloudflare Pages**: proyecto `ericwgustafson-website`, cuenta de Luis
- **Variables de ambiente necesarias**: `VITE_AUTHOR_EMAIL`, `VITE_WHATSAPP_NUMBER` (configuradas como placeholder, confirmar valores reales)
- **Manuscrito fuente**: `Mexico_Viking_-_V2.docx` (adjunto en el proyecto de Claude, contiene bibliografía completa en sección "Additional Publications" y bio de contraportada de *Joe and Running Bear*)
- **Portada final**: `portada_v9.pdf` (referencia de subtítulo formal y diseño de portada — NO es el estilo visual del sitio)

---

## 9. Próximos pasos inmediatos (orden sugerido)

*(Reemplazados — los pasos originales, 1 a 4, ya estaban hechos.)*

1. Decidir el destino del GitHub Action de deploy: cargar los secrets de Cloudflare en GitHub para que funcione de punta a punta, o eliminarlo si la integración nativa de Cloudflare es suficiente
2. Conseguir y subir una foto real de Eric a `public/images/eric-gustafson.jpg`
3. Revocar el token de GitHub embebido en `.git/config` y reconfigurar el remoto con un credential helper
4. Confirmar email/WhatsApp reales y actualizar los secrets/variables correspondientes
5. Retomar backlog 🟡 (CMS, dominio propio, links de Kindle, decisión sobre imágenes en "Selected Writings")

---

*Este documento se puede regenerar en cualquier momento pidiéndolo en el chat — se recomienda actualizarlo después de cada avance importante (ej. después de ejecutar el rediseño, después de instalar el CMS) para que siempre refleje el estado real del sitio, no solo lo planeado.*
