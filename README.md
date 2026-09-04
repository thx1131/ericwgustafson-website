# Sitio de Eric Gustafson - Mexico Viking

Sitio oficial de autor para Eric Gustafson y su obra *Mexico Viking*. Construido con Astro + Cloudflare Pages.

## 🚀 Stack Técnico

- **Framework**: [Astro](https://astro.build/)
- **Hosting**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **Lenguajes**: HTML, CSS, JavaScript
- **Versionado**: Git + GitHub

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Cuenta en GitHub
- Cuenta en Cloudflare (para deploy)

## 🛠️ Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/ericwgustafson/ericwgustafson-website.git
cd ericwgustafson-website

# Instalar dependencias
npm install

# Crear archivo .env (copiar desde .env.example y llenar datos)
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── Nav.astro
│   └── CardLibro.astro
├── layouts/
│   └── Layout.astro
├── pages/
│   ├── index.astro          (Home)
│   ├── bio.astro            (Biografía)
│   ├── publicaciones.astro  (Libros)
│   ├── contacto.astro       (Contacto)
│   └── mapa.astro           (Viajes de Nils - futuro)
├── styles/
│   └── global.css
└── data/
    └── libros.json          (Base de datos de publicaciones)
```

## 🎨 Identidad Visual

**Paleta de Colores:**
- Azul Profundo: `#0B4F8C` (primario, confianza/profesionalismo)
- Dorado: `#D4A017` (acento, aventura)
- Gris Oscuro: `#2C3E50` (texto)
- Blanco: `#FFFFFF` (fondo)
- Gris Claro: `#F8F9FA` (backgrounds secundarios)

**Tipografía:**
- Headings: Inter, Roboto (sans-serif, moderna)
- Body: Lato, Source Sans Pro (legible, profesional)

## 📝 Variables de Ambiente

Completar en `.env`:
- `VITE_AUTHOR_EMAIL`: Email de contacto
- `VITE_WHATSAPP_NUMBER`: Número WhatsApp (formato internacional sin +)
- Redes sociales opcionales
- Amazon Associate ID (si aplica)

## 🔨 Comandos Disponibles

```bash
npm run dev      # Iniciar servidor local
npm run build    # Build para producción
npm run preview  # Preview del build
npm run astro    # CLI de Astro
```

## 🌐 Deploy en Cloudflare Pages

### Opción 1: Vía GitHub (Recomendado)

1. Ir a [dash.cloudflare.com](https://dash.cloudflare.com)
2. Pages → Crear un Proyecto → Conectar a GitHub
3. Seleccionar repositorio `ericwgustafson-website`
4. Configuración:
   - Framework: Astro
   - Build command: `npm run build`
   - Build output: `dist`
5. Agregar variables de ambiente en Cloudflare
6. Deploy automático en cada push a `main`

### Opción 2: Wrangler CLI

```bash
npm install -g wrangler

# Login a Cloudflare
wrangler login

# Deploy
wrangler pages deploy dist --project-name=ericwgustafson-website
```

## 📚 Secciones del Sitio

### 🏠 Home
- Hero con portada del libro
- Resumen de la obra
- CTA a publicaciones

### 👤 Bio
- Biografía de Eric (1 cuartilla)
- Foto profesional
- Links a redes (si aplica)

### 📖 Publicaciones
- Card por cada libro
- Estado: En venta / Agotado
- Link directo a Amazon
- Disponibilidad por región

### 📧 Contacto
- Formulario (o mailto)
- Email directo
- WhatsApp
- Redes sociales

### 🗺️ Mapa (Futuro)
- Mapa interactivo de viajes de Nils
- Marcadores por año/evento
- Timeline sincronizado con capitulos del libro

## 🐛 Troubleshooting

**"Module not found"**: `npm install`

**Port 3000 en uso**: `npm run dev -- --port 3001`

**Build falla**: Limpiar cache con `rm -rf .astro && npm run build`

## 📄 Licencia

Contenido © Eric Gustafson. Código bajo MIT.

---

**Contacto**: eric@example.com | [WhatsApp]()

