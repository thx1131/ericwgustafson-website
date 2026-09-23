# Brief: Sección interactiva "The Voyages of Nils"

Pega esto en Claude Code. Los assets ya están listos:
- `Vikingo1.png` — barco vikingo (fondo transparente, 987×1011px)
- `mapa-mundial-v1.png` — mapa mundial ilustrado (fondo transparente, 3072×2048px), aprobado
- `journey.json` — 19 paradas con capítulo, lugar, fecha, descripción, coordenadas de referencia

---

Necesito construir una nueva página/sección interactiva: **"The Voyages of Nils"**. Es un mapa con un barco vikingo que se mueve entre 19 puntos según un timeline, mostrando el capítulo/lugar/fecha/resumen de cada parada.

## Archivos a colocar

1. Copia `mapa-mundial-v1.png` a `public/images/journey/map-world.png`
2. Copia `Vikingo1.png` a `public/images/journey/ship.png`
3. Copia `journey.json` a `src/data/journey.json`

## Estructura de la página

Nueva página `src/pages/journey.astro` (o el nombre que sigas usando en inglés para las rutas), agregada al nav como "The Journey" o "Voyages".

Layout (desktop, dos columnas):
- **Izquierda (~60%)**: el mapa (`map-world.png`) como fondo, con el barco (`ship.png`) posicionado absolutamente encima, en la coordenada correspondiente a la parada activa
- **Derecha (~40%)**: panel de texto mostrando de la parada activa: `chapter`, `place`, `date`, `description`
- **Abajo, ancho completo**: timeline horizontal con un punto/marca por cada una de las 19 paradas (usa el campo `order` para la secuencia), clickeable

Mobile: apilar — mapa arriba, panel de texto abajo, timeline al final con scroll horizontal si no cabe.

## Comportamiento

- Estado inicial: primera parada (`order: 1`, Toribio) activa, barco visible ahí, panel de texto ya poblado — no hay pantalla vacía esperando click
- Al hacer click en un punto del timeline: el barco se anima (transition CSS, 1-1.5s) desde su posición actual hasta la nueva; el panel de texto hace fade out/in con el nuevo contenido
- Los botones prev/next (o flechas) para navegar secuencialmente son un plus, no bloqueante

## Sobre el posicionamiento del barco en el mapa

`journey.json` trae `coords_ref` con latitud/longitud reales — **no corresponden directamente a píxeles del mapa ilustrado** (no es una proyección cartográfica real, es dibujo a mano). Vas a necesitar mapear cada parada a una posición aproximada en % (x, y) sobre la imagen del mapa, ubicándolas a ojo comparando la geografía real con el dibujo. Empieza con una estimación razonable para las 19 paradas y déjalas fácilmente ajustables (idealmente como un campo `position: {x: "42%", y: "38%"}` por parada en el JSON, o en un archivo de mapeo aparte) — vamos a necesitar afinarlas viendo el resultado real en pantalla.

**Nota**: Alaska está en un inset separado dentro de la misma imagen (esquina superior). Las 2 paradas de Alaska (Rafting the Ivishak, Mount McKinley) deben posicionar el barco dentro de ese recuadro, no en la posición geográfica real relativa al resto del mapa.

## Estilo

Sigue el sistema de diseño editorial ya establecido (`DESIGN_SYSTEM_EDITORIAL.md`): tipografía Newsreader para el nombre del capítulo, Inter para fecha/descripción, paleta crema/marino. El mapa es la única zona a todo color de la página — el resto (panel de texto, timeline, controles) se queda en la paleta editorial sobria.

## Después de construir

`npm run dev`, revisa visualmente que el barco se vea bien posicionado en al menos 4-5 paradas de prueba (una de México, una de Wyoming/Alaska, una de Europa, la de Islandia). Ajusta posiciones a ojo si se ven mal. Luego `npm run build`, commit, push.

---

**Nota para iterar después**: una vez esto esté en `dev`, lo más probable es que varias posiciones del barco necesiten ajuste fino — eso lo iremos afinando viendo capturas reales, no hay que clavarlo perfecto a la primera.
