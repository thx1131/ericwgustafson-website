# Documento de Traspaso — Sitio de Eric Gustafson

**Fecha:** 4 de septiembre, 2026 — última actualización 22 de septiembre, 2026, sesión de tarde (por Claude Code, cotejado contra el repo real, el historial de GitHub Actions vía API, el DNS y el sitio en vivo)
**Preparado por:** Luis Alberto Gálvez López (editor / gestor del proyecto)
**Proyecto:** Sitio de autor para Eric Gustafson, promoción de *Mexico Viking*

> **Nota de la revisión:** este documento describía un estado *anterior* al ya avanzado en el repo — varios puntos marcados como "pendiente" ya estaban implementados y en vivo. Las secciones de abajo fueron corregidas contra el código real, el log de `git`, el historial de GitHub Actions (vía API) y una consulta directa al sitio publicado. Los cambios de fondo respecto a la versión original están marcados inline.
>
> **Actualización del 5 de septiembre:** WhatsApp real ya está en vivo, se corrigieron 7 títulos/subtítulos de publicaciones contra sus portadas reales, se agregó una ficha nueva (edición en español de un libro), y se redujo el tamaño de las portadas de "Books". El GitHub Action de deploy sigue fallando (los secrets de Cloudflare en GitHub siguen en cero) — ver sección 2.
>
> **Actualización del 22 de septiembre:** El proyecto **no está descontinuado** — el sitio en vivo sigue respondiendo (HTTP 200) — pero tuvo 3 commits más (6-7 de septiembre) sin registrar aquí: portadas nuevas en `.webp` para *Mexico Viking* y *Joe and Running Bear*, se quitó el subtítulo del header, se puso la descripción completa de "About the Book" de *Mexico Viking*, y se actualizó el copy del hero para posicionar a Eric como autor (no solo como "Mexico Viking"). Sin commits desde entonces (15 días). Los 5 pendientes 🔴/🟡 de la revisión anterior **siguen sin resolver, confirmado hoy**: el Action de GitHub sigue fallando 100% (secrets nunca cargados), el token de GitHub sigue expuesto en texto plano en `.git/config`, la foto real de Eric sigue sin subir, el dominio propio sigue sin DNS, y el email de contacto sigue en placeholder.
>
> **Actualización del 22 de septiembre (sesión de tarde) — trabajo nuevo, todavía SOLO EN LOCAL, sin commit ni push:**
> 1. **Foto real de Eric subida y conectada** — `public/images/Biografia.webp` (retrato profesional, 937×1136) ya reemplaza la referencia rota `/images/eric-gustafson.jpg` en `bio.astro`. Esto resuelve el pendiente 🔴 más visible del documento (secciones 3, 4 y 7), pero **solo en el working tree local** — no está commiteado, por lo que el sitio en vivo sigue mostrando la imagen rota hasta que se haga commit + push.
> 2. **Nueva sección "The Voyages of Nils" construida** (`/journey`, nav "The Journey") — mapa interactivo ilustrado con un barco vikingo animado que recorre 26 paradas de la historia de Nils (las 19 originales del timeline + 7 nuevas del grupo `world-travels`: Rusia/URSS, Louisiana, Villa Santiago, el Concorde, Nueva York, Cape Cod, Thor Heyerdahl), con panel de texto sincronizado, timeline navegable, estela de recorrido dibujada en el mapa, animación idle del barco, y layout responsivo (full-bleed en móvil/tablet, contenido en escritorio). El origen de esta pieza fue una sesión de trabajo asistida por IA (Codex generó el mapa/assets iniciales; se completó y refinó en esta sesión de Claude Code). **Igual que la foto: solo en local, sin commit ni push — no existe en el repo remoto ni en el sitio en vivo.**
>    - Archivos nuevos: `src/pages/journey.astro`, `src/data/journey.json` (26 paradas), `src/data/journeyPositions.json` (coordenadas x/y en % sobre el mapa), `public/images/journey/map-world.png` + `ship.png`
>    - **Pendiente de revisión por Luis/Eric:** la parada "Russian or Viking" (Astrakhan, URSS) queda geográficamente fuera del área que dibuja el mapa ilustrado (el mapa no llega tan al este) — se posicionó como aproximación en el borde derecho, no es su ubicación real. Falta decidir si se extiende el mapa hacia el este o se deja como licencia artística.
>    - Se detectaron y corrigieron errores serios de posicionamiento heredados de la sesión de Codex: el clúster completo de la Costa Este de EE.UU. (Duke, Annapolis, Washington D.C., Nueva York, Cape Cod) estaba puesto en Canadá cerca de la Bahía de Hudson, los dos puntos de Alaska caían en el océano en vez de sobre tierra, y el clúster de México quedaba cerca de las islas del Caribe en vez de en territorio mexicano. Todo corregido y verificado visualmente contra el mapa real.
> 3. **Ambos avances (foto + Journey) requieren `git add` + commit + push antes de que se reflejen en el repo remoto o en Cloudflare Pages.** Ver sección 9, ahora es el primer paso pendiente.

---

## 1. Contexto

Sitio de autor para Eric Gustafson, construido para dar salida comercial a *Mexico Viking* (novela, KDP) vía Amazon, presentar su bibliografía completa, y dar una vía de contacto directa. Eric es el autor; Luis coordina el proyecto y ejecuta cambios técnicos con ayuda de Claude Code (Linux) y Claude (chat, para planeación/contenido).

**Objetivos originales del sitio:**
- Vía clara de compra en Amazon
- Identidad visual propia, separada del diseño de portada del libro
- Mapa interactivo de los viajes de Nils, el protagonista — construido el 22 de septiembre (`/journey`), pendiente de commit + push (ver sección 3.1)

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

Con esto, ambas vías de deploy apuntan al mismo proyecto real — pero **el Action sigue fallando** (confirmado el 5 de septiembre, runs `33929871683` en adelante, 6/6 fallidos desde el fix): ahora sí compila, pero se cae en el paso de deploy porque **no hay ningún secret configurado en GitHub** (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `AUTHOR_EMAIL`, `WHATSAPP_NUMBER` — los 4 en cero, confirmado vía API: `total_count: 0`). Wrangler lo dice explícito: *"it's necessary to set a CLOUDFLARE_API_TOKEN environment variable for wrangler to work"*.

**Esto no afecta el sitio en vivo** — Luis ya resolvió el WhatsApp agregando la variable directo en el dashboard de Cloudflare (ver abajo), que es la vía que de verdad construye el sitio. El Action de GitHub sigue siendo un cheque rojo decorativo en cada push. Queda pendiente decidir si se carga el secret ahí también o se elimina el workflow (ver sección 5, punto 🔴 1).

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
- ✅ Las 12 publicaciones ya tienen portada (9 se subieron y conectaron el 2026-09-04; la 12ª —edición en español de "A Story of Success in Rural Mexico"— el 2026-09-05)
- ✅ Logo de marca en header + favicon
- ✅ **WhatsApp real ya en vivo** (2026-09-05): `528180533791`, confirmado en Home y Contact (`wa.me/528180533791`) vía la variable de ambiente `VITE_WHATSAPP_NUMBER` que Luis agregó directo en Cloudflare Pages. El `.env` local ya tenía el número desde antes, pero nunca había llegado a producción porque ese archivo está (correctamente) fuera de git.
- ✅ **7 títulos/subtítulos de publicaciones corregidos** (2026-09-05) tras comparar cada portada real contra `publications.json` — había diferencias de fondo, no solo de forma: "White Winged Dove in NE Mexico" → "The White Wing Dove in Northeast México"; "...Teaching Improvement Center..." le faltaba "Post Secondary"; "Success Story in Rural Mexico" tenía las palabras en otro orden que la portada ("A Story of Success in Rural Mexico"); "Aves de México" le faltaba el prefijo "El Libro de"; "Eco Efficiency" en realidad es un título en español ("Eco Eficiencia"). Se completaron también 5 subtítulos que estaban en `null` pese a aparecer en la portada.
- ✅ Corregida una atribución equivocada: la ficha de "A Story of Success in Rural Mexico" decía que Eric escribió el "prólogo"; la portada muestra que el prólogo lo firma Eugenio Gras Menaut y Eric escribió el "proemio" (preface) — ya corregido en la descripción.
- ✅ Portadas de "Books" (Mexico Viking, Joe and Running Bear) reducidas de ~580px a 320px de ancho en la página de Publications — antes dominaban visualmente la sección.
- ✅ **Portadas nuevas de Mexico Viking y Joe and Running Bear** (2026-09-06): arte generado nuevo reemplaza los placeholders anteriores, ahora en `.webp` para igualar al resto del catálogo; se quitó el subtítulo del libro bajo el nombre del autor en el header (y su CSS huérfano `.header__tag`)
- ✅ **Descripción completa de "About the Book" para Mexico Viking** (2026-09-06): reemplaza el resumen corto por el texto más largo del propio autor sobre el viaje de Nils, encuentros inesperados, la clarividencia, y el término acuñado por Eric "sustain-ervation"
- ✅ **Copy del hero actualizado** (2026-09-06): posiciona a Eric como autor en general, no solo como "el autor de Mexico Viking"
- ⚠️ **Pipeline de deploy — el Action de GitHub sigue fallando, confirmado hoy vía `gh run list` (100% de fallos, incluyendo los 3 commits del 6 de septiembre), ver nota de la sección 2.** No estaba "100% funcional y probado" como decía la versión original de este documento: llevaba 13/13 ejecuciones fallidas desde el commit inicial por Node 18 vs Astro ≥22.12. Ya se corrigió esa causa (commit `13befee`), pero ahora falla en el paso de deploy por falta de secrets de Cloudflare en GitHub — sigue sin resolverse. El sitio en vivo sigue bien gracias a la integración nativa de Cloudflare, que es independiente de este Action.

**Idioma actual del sitio en vivo:** **inglés**, confirmado en el HTML servido (`<html lang="en">`, nav "Home/Biography/Publications/Contact"). La traducción ya no está pendiente.

**Foto de Eric — resuelta en local, no en vivo todavía:** `bio.astro` referenciaba `/images/eric-gustafson.jpg`, que no existía en `public/images/` (imagen rota en el sitio en vivo). El 22 de septiembre se subió `public/images/Biografia.webp` y se actualizó la referencia en `bio.astro`. **Falta el commit + push para que llegue al sitio en vivo** — hasta entonces, la imagen sigue rota en producción aunque ya funcione en local.

### 3.1 Construido en esta sesión (22 de septiembre, tarde) — SOLO EN LOCAL, sin commit ni push

- ✅ **Foto real de Eric** conectada en `bio.astro` (ver nota arriba) — falta deploy.
- ✅ **Página "The Voyages of Nils"** (`/journey`, nav "The Journey") — mapa interactivo con barco animado sobre 26 paradas de la historia (19 del timeline original + 7 nuevas de un grupo `world-travels`), panel de texto sincronizado, timeline navegable con teclado y prev/next, estela de recorrido dibujada sobre el mapa, animación idle del barco, layout responsivo (mapa a todo el ancho en móvil/tablet, contenido en escritorio). Ver el detalle completo en la nota de actualización al inicio del documento — falta deploy.
- ⚠️ Ambas cosas viven únicamente en el working tree de este repo local. **No están en GitHub ni en Cloudflare Pages.** Ver sección 9, punto 1.

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
| `Biografia.webp` | Foto profesional de Eric (retrato, 937×1136) | ⚠️ **Subida y conectada en `bio.astro` el 22 de septiembre — pero solo en local.** Falta commit + push para que llegue al sitio en vivo. |
| Edición en español de *A Story of Success in Rural Mexico* ("Una Historia de Éxito en el México Rural") | Portada en español, mismo libro que la ficha en inglés | ✅ **Ficha nueva creada** el 2026-09-05: `success-story-rural-mexico-es` en `publications.json`, con su propia portada y descripción en español |
| `journey.json` (26 paradas) + `journeyPositions.json` | Datos del timeline interactivo "The Voyages of Nils": capítulo, lugar, fecha, descripción y coordenadas x/y sobre el mapa de cada parada | ⚠️ **Página completa construida el 22 de septiembre (`src/pages/journey.astro`) — solo en local.** Falta commit + push. |
| `map-world.png` + `ship.png` | Mapa ilustrado (mano alzada) del recorrido + barco vikingo, para la sección "The Voyages of Nils" | ⚠️ **Ya en `public/images/journey/` — solo en local.** Falta commit + push. |

---

## 5. Backlog / Pendientes (priorizado)

*(Corregida — la mayoría de los puntos 🔴 originales ya estaban resueltos; se archivaron abajo y se agregó el hallazgo real de CI/CD.)*

### 🔴 Crítico / siguiente paso inmediato
1. **Hacer commit + push del trabajo del 22 de septiembre** (foto de Eric + página "The Voyages of Nils" completa) — todo vive solo en el working tree local de este repo ahora mismo. Sin esto, ni la foto ni el mapa interactivo llegan al sitio en vivo, sin importar qué tan terminados estén. Ver detalle en la nota de actualización al inicio del documento y en la sección 3.1.
2. **Configurar los secrets de Cloudflare en GitHub** (`Settings → Secrets and variables → Actions` del repo) para que el GitHub Action de deploy funcione de punta a punta: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, y opcionalmente `AUTHOR_EMAIL`/`WHATSAPP_NUMBER` (hoy los 4 están vacíos — confirmado vía API, `total_count: 0`). Sin esto, el Action seguirá fallando en el paso de deploy aunque el build ya compile. El sitio en vivo no depende de esto (lo sirve la integración nativa de Cloudflare), pero mientras no se resuelva, cada push seguirá marcando ❌ en GitHub — hay que decidir si vale la pena mantener este Action redundante o eliminarlo.

### 🟡 Importante, no bloqueante
3. **CMS headless (Decap CMS)** — aún no se ha instalado. Definir primero: ¿quién edita? (¿Eric directo, requiere GitHub, o alternativa con login simple?). Alcance propuesto: editable = textos de bio, datos de publicaciones (precio, estado, links, portadas). NO editable vía CMS = colores/tipografía (decisión de diseño fija)
4. **Link de Amazon Kindle** faltante para *Mexico Viking* y *Joe and Running Bear* (solo se tienen paperback confirmados; Kindle de Mexico Viking es placeholder `XXXXX`)
5. **Confirmar email definitivo** para la página de Contacto (aún placeholder `eric@example.com` en `.env.example`/Cloudflare — el WhatsApp ya se resolvió el 2026-09-05)
6. **Dominio propio** — apuntar `ericwgustafson.com` a Cloudflare Pages (confirmado: hoy no resuelve DNS, sigue viviendo solo en `.pages.dev`)
7. **Sección "Selected Writings" con imágenes** — decidir si se deja como cards con portada (estado actual, ya con las 10 portadas subidas) o se vuelve a la lista bibliográfica sin imágenes que pedía el `ADDENDUM_PUBLICATIONS.md` original

### ✅ Ya resuelto (archivado — estaba mal marcado como pendiente en la versión anterior de este documento)
- ~~Ejecutar el rediseño editorial~~ — hecho, ver sección 3
- ~~Reemplazar `libros.json` por `publications.json`~~ — hecho
- ~~Subir `joe-and-running-bear-cover.jpg`~~ — hecho
- ~~Integrar texto de bio desde `BIO_CONTENT.md`~~ — hecho
- ~~Traducir la UI a inglés~~ — hecho
- ~~Subir portadas de las 9 publicaciones restantes~~ — hecho el 2026-09-04
- ~~Confirmar y publicar el número de WhatsApp real~~ — hecho el 2026-09-05 (`528180533791`, vía variable de ambiente en Cloudflare Pages)
- ~~Corregir títulos/subtítulos de publicaciones contra sus portadas reales~~ — hecho el 2026-09-05 (7 correcciones + 5 subtítulos agregados)
- ~~Crear ficha para la edición en español de "A Story of Success in Rural Mexico"~~ — hecho el 2026-09-05
- ~~Reducir tamaño de portadas de "Books" en Publications~~ — hecho el 2026-09-05

### 🟢 Futuro / fase 2
10. ~~Mapa interactivo de los viajes de Nils~~ — **construido el 22 de septiembre** (`/journey`, "The Voyages of Nils"), ver sección 3.1. Queda como pendiente real, no de construcción sino de despliegue (🔴 punto 1) y una decisión de diseño: la parada "Russian or Viking" (Astrakhan) cae fuera del área que dibuja el mapa ilustrado — falta decidir si se extiende el mapa hacia el este o se deja como aproximación artística.
11. Posible ampliación de página "Selected Writings" con más detalle por publicación si Eric quiere
12. Si se decide extender el mapa de "The Voyages of Nils" hacia el este (ver punto 10), habrá que regenerar `map-world.png` con el mismo estilo (dibujo a mano + IA) y reposicionar las coordenadas afectadas en `journeyPositions.json`

### ⚠️ Fuera del sitio, pero relacionado (nivel libro/KDP)
13. **Conflicto sin resolver: subtítulo "Memoir" vs. clasificación de ficción en KDP.** El subtítulo formal de portada dice *"A Viking's Memoir on Mexico's Environmental Challenges"*, pero el libro se clasifica como ficción en KDP porque Eric no quiere ser identificado públicamente con el protagonista (Nils). Este subtítulo ya se usó en `publications.json` tal cual viene en portada — si se resuelve el conflicto a nivel de portada/KDP, hay que actualizar también el sitio (un solo campo en `publications.json`, cambio menor)
14. Kindle: posible necesidad de marcar `Cap_Titulo` con Outline Level 1 para TOC navegable (pendiente de otras conversaciones sobre el libro, no bloquea el sitio)

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
- Falta confirmar y cargar el email real de contacto (WhatsApp ya resuelto el 2026-09-05)
- **La foto de Eric ya está resuelta en local (22 de septiembre) pero sigue rota en el sitio en vivo** hasta que se haga commit + push — ver sección 3.1
- **Todo el trabajo del 22 de septiembre (foto + página "The Voyages of Nils") vive solo en el working tree local** — un `git status` sucio con ~10 archivos nuevos/modificados sin commitear. Riesgo de pérdida si algo pasa con esta máquina antes de subirlo.
- **El remoto `origin` de este repo local tiene el token personal de GitHub de Luis embebido en texto plano** en `.git/config` (`https://thx1131:ghp_...@github.com/...`). Cualquiera con acceso a esta máquina/repo local puede leerlo. Recomendado: revocar ese token y reconfigurar el remoto con un credential helper en vez de la URL. **Sigue sin resolverse — confirmado el 22 de septiembre, el token sigue expuesto igual que el 4 de septiembre.** (Señalado también en la sesión de Claude Code del 2026-09-04, sección de git.)
- ¿Vale la pena mantener el GitHub Action de deploy si la integración nativa de Cloudflare ya cubre el despliegue? Si se decide que sí, falta cargar los secrets de Cloudflare en GitHub (ver sección 5, punto 🔴 1). Si se decide que no, se puede simplificar borrando `.github/workflows/deploy.yml` para dejar de depender de dos mecanismos en paralelo.

---

## 8. Accesos y recursos

- **Repo GitHub**: `github.com/thx1131/ericwgustafson-website`
- **Cloudflare Pages**: proyecto `ericwgustafson-website`, cuenta de Luis
- **Variables de ambiente**: `VITE_WHATSAPP_NUMBER` ya configurada con el valor real (`528180533791`) directo en Cloudflare Pages desde el 2026-09-05. `VITE_AUTHOR_EMAIL` sigue como placeholder — falta confirmar y cargar el email real, en el mismo lugar (Cloudflare Pages → Settings → Environment variables)
- **Manuscrito fuente**: `Mexico_Viking_-_V2.docx` (adjunto en el proyecto de Claude, contiene bibliografía completa en sección "Additional Publications" y bio de contraportada de *Joe and Running Bear*)
- **Portada final**: `portada_v9.pdf` (referencia de subtítulo formal y diseño de portada — NO es el estilo visual del sitio)

---

## 9. Próximos pasos inmediatos (orden sugerido)

*(Actualizado 22 de septiembre, sesión de tarde — se agrega el commit/push del trabajo de hoy como paso 1, ver sección 3.1.)*

1. **Revisar y hacer commit + push de la foto de Eric y de la página "The Voyages of Nils"** — hoy solo existen en el working tree local de este repo, no en GitHub ni en el sitio en vivo
2. Decidir el destino del GitHub Action de deploy: cargar los secrets de Cloudflare en GitHub para que funcione de punta a punta, o eliminarlo si la integración nativa de Cloudflare es suficiente
3. Revocar el token de GitHub embebido en `.git/config` y reconfigurar el remoto con un credential helper
4. Confirmar el email real y cargarlo como `VITE_AUTHOR_EMAIL` en Cloudflare Pages (mismo mecanismo ya usado para el WhatsApp)
5. Decidir el destino de la parada "Russian or Viking" en el mapa del Journey (¿extender el mapa hacia el este o dejar la aproximación actual?) — ver sección 5, punto 🟢 10
6. Retomar backlog 🟡 (CMS, dominio propio, links de Kindle, decisión sobre imágenes en "Selected Writings")

---

*Este documento se puede regenerar en cualquier momento pidiéndolo en el chat — se recomienda actualizarlo después de cada avance importante (ej. después de ejecutar el rediseño, después de instalar el CMS) para que siempre refleje el estado real del sitio, no solo lo planeado.*
