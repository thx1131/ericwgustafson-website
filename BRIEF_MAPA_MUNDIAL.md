# Brief: Mapa extendido para "The Voyages of Nils"

Para quien haga el proceso de dibujo infantil + matices con IA (el mismo que se usó para el mapa de México y el barco vikingo).

## Alcance geográfico necesario

Basado en la extracción de las 19 paradas del timeline, el mapa necesita cubrir:

- **México**: costa de Tamaulipas, Monterrey, Durango (ya existe — ver si se reutiliza tal cual o se rehace para que combine con el resto)
- **Estados Unidos**: costa este (Carolina del Norte, Maryland, Washington D.C.), Wyoming, Alaska
- **Europa del norte**: Suecia (Estocolmo), Islandia, Francia (costa norte/Normandía), Inglaterra (Canal de la Mancha)

Esto es esencialmente una vista del **Atlántico Norte** — México y sureste de EU quedan en la esquina inferior izquierda, Alaska muy separado en la esquina superior izquierda (posible recuadro aparte, ver nota abajo), y Europa del norte en la esquina superior derecha.

## Nota sobre Alaska

Alaska geográficamente está muy lejos y en una posición incómoda para meter en la misma composición sin distorsionar todo el mapa (quedaría enorme el océano Pacífico vacío entre México y Alaska). Sugerencia: dibujar Alaska como un **recuadro/inset separado** (como suelen hacer los mapas de EU con Alaska y Hawaii), en vez de forzarlo a la misma proyección continua. Esto es una decisión de composición para quien dibuje — hay que decidirlo antes de empezar a dibujar, no después.

## Estilo (mantener consistencia con el mapa de México existente)

- Técnica: dibujo a mano (crayón/lápiz de color) escaneado, con matices de color aplicados por IA
- Contorno en tinta negra gruesa, como el mapa de México
- Paleta: verdes/amarillos/naranjas para tierra (relieve), azul con textura de trazo para agua — igual que la referencia
- Nivel de detalle: geografía reconocible pero no cartográficamente precisa — el mismo espíritu "ilustrado" del mapa de México, no un mapa técnico

## Entregable esperado

- PNG con fondo transparente (igual que el barco), alta resolución (mínimo 2000px en el lado más largo)
- Si Alaska va en recuadro aparte: 2 archivos PNG separados (mapa principal + inset de Alaska), o un solo archivo con el inset ya compuesto — lo que sea más fácil de producir

## Uso final

Este mapa es el fondo estático de una sección interactiva del sitio: un barco vikingo (ya lo tenemos, es el archivo `Vikingo1.png`) se va a mover sobre este mapa según un timeline de 19 paradas, cada una con su capítulo, lugar, fecha y resumen. El mapa no se anima — solo el barco se desplaza sobre él.

---

**Archivo de datos de las 19 paradas**: `journey.json` (adjunto por separado) — sirve como referencia de qué lugares deben ser identificables en el mapa.
