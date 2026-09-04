# 🎨 Sistema de Diseño — Editorial / Formal

Reemplaza al DESIGN_SYSTEM.md anterior (azul/dorado corporativo). Esta versión busca un tono de **editorial de autor**: serio, refinado, con aire de libro/revista literaria — no de landing page comercial.

Referencias de tono: editoriales como Anagrama, Sexto Piso; revistas como The Paris Review, Aeon.

---

## 🎯 Paleta de Colores

```
Fondo (papel)           #FAF8F4
Fondo alterno (muted)   #F1EDE4
Texto principal         #1A1A18
Texto secundario        #55524C
Acento primario         #1F3A52   (azul marino desaturado — único acento fuerte)
Acento secundario       #9C6B30   (ocre apagado — uso mínimo, detalles)
Líneas / separadores    #DDD8CE
Blanco puro (raro uso)  #FFFFFF
Verde éxito (disponible)#4A7856   (verde apagado, no brillante)
Gris (agotado)          #8A867C
```

**Regla de oro**: el acento primario (azul marino) se usa en headings y elementos de navegación. El ocre casi no se usa — solo micro-detalles como un guion decorativo o un hover muy sutil. Nada de dorado brillante, nada de sombras marcadas.

---

## 🔤 Tipografía

### Headings — Newsreader (serif editorial)
- Google Fonts: `Newsreader`
- Weights: 400 (regular), 500 (medium), 400 italic (para citas o subtítulos)
- Letter-spacing: normal (0), nada de tracking negativo agresivo
- Da el aire de "libro" / prensa seria

### Body — Inter (sans, legible)
- Google Fonts: `Inter`
- Weights: 400, 500
- Line-height: 1.7 (más aire que antes, sensación de lectura pausada)

### Escala tipográfica

```
H1 (Hero)          56px / 3.5rem    Newsreader 400, line-height 1.15
H2 (Section)        36px / 2.25rem  Newsreader 500, line-height 1.25
H3 (Subsection)     28px / 1.75rem  Newsreader 500
Body                17px / 1.0625rem Inter 400, line-height 1.7
Small / meta         14px / 0.875rem Inter 500, letter-spacing 0.04em, uppercase (para etiquetas tipo "NOVELA · 2024")
```

### Ejemplo CSS

```css
@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500&display=swap');

:root {
  --color-bg: #FAF8F4;
  --color-bg-muted: #F1EDE4;
  --color-text: #1A1A18;
  --color-text-muted: #55524C;
  --color-accent: #1F3A52;
  --color-accent-soft: #9C6B30;
  --color-border: #DDD8CE;
  --color-available: #4A7856;
  --color-soldout: #8A867C;

  --font-heading: 'Newsreader', Georgia, serif;
  --font-body: 'Inter', -apple-system, sans-serif;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  line-height: 1.7;
}

h1, h2, h3 {
  font-family: var(--font-heading);
  font-weight: 500;
  color: var(--color-text);
  letter-spacing: 0;
}

h1 {
  font-weight: 400;
  font-size: 3.5rem;
  line-height: 1.15;
}
```

---

## 🔲 Layout — cambios clave vs versión anterior

| Elemento | Antes (corporativo) | Ahora (editorial) |
|---|---|---|
| Cards de libros | Sombra + border-radius 8px | Sin sombra, línea fina `1px solid var(--color-border)`, esquinas rectas |
| Ancho de texto | Full width en secciones | Columnas angostas, max 65ch para párrafos largos |
| Separadores | `hr` genérico | Línea fina + espacio generoso arriba/abajo |
| Header | Fondo azul sólido | Fondo crema, solo línea inferior fina, texto en azul marino |
| Botones | Dorado sólido con sombra en hover | Borde simple, texto azul marino, hover = fondo azul marino + texto crema (sin sombra) |
| Badges (Disponible/Agotado) | Pill con fondo de color | Texto pequeño en mayúsculas con punto de color antes (·), sin fondo |

### Botones (nuevo estilo)

```css
.btn {
  display: inline-block;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.95rem;
  padding: 12px 28px;
  border: 1px solid var(--color-accent);
  border-radius: 2px; /* casi recto, no pill */
  color: var(--color-accent);
  background: transparent;
  transition: all 0.25s ease;
}

.btn:hover {
  background: var(--color-accent);
  color: var(--color-bg);
}
```

### Cards de libro (nuevo estilo)

```css
.card-libro {
  border-top: 1px solid var(--color-border);
  padding-top: var(--space-lg);
  /* sin sombra, sin border-radius, sin hover-lift */
}
```

---

## 📐 Espaciado

Igual que antes (sistema 8px), pero con **más aire entre secciones**:

```
Section padding desktop: 96px 0 (antes 64px)
Section padding mobile:  48px 0
```

---

## 🖋️ Detalles editoriales

- **Etiquetas tipo género** ("NOVEL · ADVENTURE · CONSERVATION"): uppercase, letter-spacing amplio, tamaño pequeño, color texto secundario — como créditos de revista
- **Citas o sinopsis destacadas**: usar Newsreader itálica, tamaño mayor (1.25rem), con línea vertical delgada a la izquierda como blockquote editorial
- **Números de página / capítulo** (si se usan referencias al libro): tipografía monoespaciada pequeña, opcional

---

## ✅ Checklist de migración desde el sistema anterior

- [ ] Cambiar fuente de Google Fonts import (Newsreader + Inter)
- [ ] Reemplazar variables de color en `global.css`
- [ ] Quitar `box-shadow` y `border-radius` grandes de `.card`
- [ ] Cambiar `.btn-primary` (dorado sólido) → nuevo estilo de borde
- [ ] Header: fondo azul sólido → fondo crema + línea inferior
- [ ] Badges: pill de color → texto + punto de color
- [ ] Revisar que h1/h2/h3 usen Newsreader, no Inter
- [ ] Aumentar `line-height` de body a 1.7
- [ ] Aumentar padding de secciones en desktop a 96px

---

**Nota**: Este documento reemplaza a `DESIGN_SYSTEM.md`. Consérvalo como referencia única de ahora en adelante.
