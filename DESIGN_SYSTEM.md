# 🎨 Identidad Visual - Sitio de Eric Gustafson

Guía de diseño profesional y seria para el sitio de autor.

## 📋 Resumen de Decisiones

**Portada del libro** (azul/amarillo/vikingo): Solo para marketing externo, Amazon, etc.
**Sitio web**: Profesional, serio, corporativo. Azul + dorado como acentos, no como protagonistas.

---

## 🎯 Paleta de Colores

### Colores Primarios
```
Azul Profundo (Confianza)      #0B4F8C    rgb(11, 79, 140)
Azul Oscuro (Alternativo)      #1A3A5C    rgb(26, 58, 92)
```

### Colores de Acento
```
Dorado (Elegancia)             #D4A017    rgb(212, 160, 23)
Dorado Claro (Hover)           #E8B923    rgb(232, 185, 35)
```

### Escala de Grises
```
Gris Oscuro (Texto)            #2C3E50    rgb(44, 62, 80)
Gris Medio (Secundario)        #5A6C7D    rgb(90, 108, 125)
Gris Claro (Borders)           #D5DADF    rgb(213, 218, 223)
Gris Muy Claro (BG)            #F8F9FA    rgb(248, 249, 250)
```

### Colores Semánticos
```
Blanco (Limpio)                #FFFFFF    rgb(255, 255, 255)
Verde Éxito                    #27AE60    rgb(39, 174, 96)
Rojo Error                     #E74C3C    rgb(231, 76, 60)
Naranja Advertencia            #F39C12    rgb(243, 156, 18)
```

### Uso por Sección
- **Header/Footer**: Azul Profundo (#0B4F8C)
- **Botones CTA**: Dorado (#D4A017) + Texto Blanco
- **Links**: Azul Profundo, underline en hover Dorado
- **Backgrounds**: Blanco o Gris Muy Claro (#F8F9FA)
- **Cards**: Blanco con border Gris Claro
- **Textos**: Gris Oscuro (#2C3E50)

---

## 🔤 Tipografía

### Fonts Recomendadas

**Headings (H1, H2, H3)**
- Primary: **Inter** (Google Fonts)
- Fallback: -apple-system, BlinkMacSystemFont, sans-serif
- Weight: 700 (Bold)
- Letter spacing: -0.02em

**Body (Párrafos, texto)**
- Primary: **Lato** (Google Fonts)
- Fallback: -apple-system, BlinkMacSystemFont, sans-serif
- Weight: 400 (Regular)
- Line height: 1.6
- Letter spacing: 0em

**Monospace (Código, si es necesario)**
- Font: **Fira Code** (Google Fonts)
- Weight: 400
- Size: 0.9em

### Escala Tipográfica

```
H1 (Hero, page title)    48px / 3rem   line-height: 1.2
H2 (Section title)       36px / 2.25rem line-height: 1.3
H3 (Subsection)          28px / 1.75rem line-height: 1.3
H4 (Subheading)          24px / 1.5rem  line-height: 1.4
Body text                16px / 1rem    line-height: 1.6
Small text               14px / 0.875rem line-height: 1.5
```

### Ejemplos CSS

```css
/* Headings */
h1, h2, h3, h4 {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #2C3E50;
}

/* Body */
body, p {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  line-height: 1.6;
  color: #2C3E50;
}

/* Links */
a {
  color: #0B4F8C;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s;
}

a:hover {
  border-bottom-color: #D4A017;
}
```

---

## 🎯 Componentes Visuales

### Botones

**Primary (CTA)**
```
Background: #D4A017
Text: #FFFFFF
Padding: 12px 24px
Border-radius: 4px
Font-weight: 600
Hover: Background #E8B923
```

**Secondary**
```
Background: transparent
Border: 2px solid #0B4F8C
Text: #0B4F8C
Padding: 10px 22px
Border-radius: 4px
Hover: Background #0B4F8C, Text #FFFFFF
```

### Cards (Libros, Artículos)

```
Background: #FFFFFF
Border: 1px solid #D5DADF
Border-radius: 8px
Padding: 24px
Box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08)
Hover: Box-shadow aumenta a 0 8px 16px rgba(0, 0, 0, 0.12)
```

### Headers / Secciones

```
H2 color: #0B4F8C
Underline: 4px solid #D4A017 (opcional, solo en homepage)
Margin-bottom: 32px
```

### Separadores

```
Border: 1px solid #D5DADF
Margin: 32px 0
```

---

## 📐 Espaciado (Sistema 8px)

```
xs:  4px
sm:  8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
```

Usar en: padding, margin, gaps, etc.

---

## 🔲 Layout

### Contenedor Principal
```
Max-width: 1200px
Margin: 0 auto
Padding: 0 16px (mobile), 0 24px (desktop)
```

### Espaciado de Secciones
```
Section padding: 64px 0 (desktop)
              : 32px 0 (mobile)
```

---

## 📱 Responsive

### Breakpoints

```
Mobile:   < 768px
Tablet:   768px - 1024px
Desktop:  > 1024px
```

### Consideraciones Mobile
- Font size: 16px (evitar zoom en inputs)
- Touch targets: Mínimo 44x44px
- Padding reducido pero mantenido en secciones
- Imágenes: Full-width con padding

---

## 🖼️ Imágenes

### Fotos de Portada / Libro
- Formato: JPG
- Dimensión estándar: 6:9 ratio
- Compresión: Optimizada para web (< 500KB)

### Fotos de Perfil / Bio
- Formato: JPG
- Recomendado: 400x500px (1:1.25 ratio)
- Compresión: < 300KB
- Filter (opcional): Slight desaturate o sepia

### Iconos
- Formato: SVG
- Color: Inherit (para facilitar cambios)
- Size: 24px, 32px, 48px

---

## ✨ Micro-interacciones

### Hover en Enlaces
```
transition: color 0.2s ease
border-bottom: 2px solid #D4A017
```

### Hover en Botones
```
transition: all 0.2s ease
Box-shadow: 0 4px 12px rgba(212, 160, 23, 0.2)
Transform: translateY(-2px) (opcional)
```

### Hover en Cards
```
transition: all 0.3s ease
Box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12)
Transform: translateY(-4px) (opcional)
```

---

## 📝 Ejemplos de Uso

### Página Home

```
Header (Azul #0B4F8C) + Nav
↓
Hero (Blanco BG, H1 Azul, CTA Dorado)
↓
About Section (Gris Claro BG, texto normal)
↓
Latest Book (Card blanca, imagen, CTA Dorado)
↓
Footer (Azul #0B4F8C)
```

### Página Publicaciones

```
Header
↓
Title (Azul) + Filtros
↓
Grid de Cards (Blancas, borders grises)
  - Imagen
  - Título (Azul oscuro)
  - Descripción (Gris medio)
  - Badge (Verde = Disponible, Gris = Agotado)
  - Botón "Comprar" (Dorado)
↓
Footer
```

---

## 🎨 Referencia Visual

**No usar:**
- Amarillo brillante de la portada como principal
- Colores pastel
- Efectos de sombra fuertes (max 0.08-0.12 opacity)

**Sí usar:**
- Espacios en blanco generosos
- Tipografía clara y legible
- Acentos de dorado muy moderados
- Profesionalismo como norte

---

**Nota**: Esta guía es flexible. Cualquier ajuste se documenta aquí para mantener coherencia.

