# 🔧 Setup del Repositorio en GitHub

Paso a paso para crear y configurar el repo del sitio de Eric.

## PASO 1: Crear el Repositorio en GitHub

1. Ve a [GitHub.com](https://github.com) e inicia sesión
2. Click en **New** (o el + arriba a la derecha)
3. Nombre: `ericwgustafson-website`
4. Descripción: `Sitio oficial de Eric Gustafson - Autor de Mexico Viking`
5. **Public** (para que sea visible)
6. ✅ "Add a README file"
7. ✅ "Add .gitignore" → Select: `Node`
8. Click **Create repository**

## PASO 2: Clonar y Agregar Archivos Localmente

```bash
# Clonar el repo (reemplazar USERNAME con tu usuario de GitHub)
git clone https://github.com/USERNAME/ericwgustafson-website.git
cd ericwgustafson-website

# Reemplazar el README generado por GitHub con el nuestro
rm README.md
# (Copiar el README.md que preparé)

# Copiar los archivos de configuración que preparé:
# - astro.config.mjs
# - package.json
# - .gitignore (reemplazar el generado por GitHub)
# - .env.example
# - .github/workflows/deploy.yml (crear carpeta .github/workflows/ si no existe)
```

## PASO 3: Crear Estructura de Carpetas

```bash
# Desde la raíz del proyecto:
mkdir -p src/components
mkdir -p src/layouts
mkdir -p src/pages
mkdir -p src/styles
mkdir -p src/data
mkdir -p public/images
mkdir -p public/docs

# Verifica que quede así:
tree -L 2
# (Deberías ver: src/, public/, .github/, etc.)
```

## PASO 4: Commit Inicial

```bash
git add .
git commit -m "Initial setup: Astro + Cloudflare Pages configuration"
git push origin main
```

## PASO 5: Configurar Secrets en GitHub (para Deploy)

Estos secrets son necesarios para que GitHub pueda hacer deploy en Cloudflare automaticamente.

1. En tu repo de GitHub, ve a **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** y agrega:

### Secret 1: CLOUDFLARE_API_TOKEN
- **Name**: `CLOUDFLARE_API_TOKEN`
- **Value**: Token de Cloudflare (obtener en cloudflare.com → Profile → API Tokens)
  - Click "Create Token"
  - Use template "Edit Cloudflare Workers"
  - Copy el token

### Secret 2: CLOUDFLARE_ACCOUNT_ID
- **Name**: `CLOUDFLARE_ACCOUNT_ID`
- **Value**: ID de tu cuenta Cloudflare
  - Obtener en cloudflare.com → Dashboard → Account ID (lado derecho)

### Secret 3: AUTHOR_EMAIL
- **Name**: `AUTHOR_EMAIL`
- **Value**: Email de Eric (ej: eric@example.com)

### Secret 4: WHATSAPP_NUMBER
- **Name**: `WHATSAPP_NUMBER`
- **Value**: Número de WhatsApp en formato internacional sin + (ej: 525212345678)

## PASO 6: Conectar Cloudflare Pages

1. Ve a [dash.cloudflare.com](https://dash.cloudflare.com)
2. **Pages** → **Create a project** → **Connect to Git**
3. Autoriza GitHub y selecciona el repo `ericwgustafson-website`
4. **Build settings**:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
5. **Environment variables** (copiar desde GitHub Secrets):
   - VITE_AUTHOR_EMAIL
   - VITE_WHATSAPP_NUMBER
6. Click **Save and Deploy**

Cloudflare ahora hará deploy automático en cada push a `main`.

## PASO 7: Verificar Todo Funciona

```bash
# En local:
npm install
npm run dev

# Deberías ver:
# "  ▶ Local:        http://localhost:3000/"

# Visita http://localhost:3000 en el navegador
```

Si todo está bien, puedes hacer un cambio pequeño y pushearlo:

```bash
echo "# Test deploy" >> TEST.md
git add TEST.md
git commit -m "Test: Verify CI/CD pipeline"
git push origin main

# Ve a GitHub → Actions para ver el workflow ejecutándose
# Ve a Cloudflare Pages para ver el deploy en vivo
```

## 📋 Checklist de Setup Completado

- [ ] Repo creado en GitHub
- [ ] Archivos de configuración (astro, package.json, etc.) en main
- [ ] Estructura de carpetas `src/`, `public/`, etc. creada
- [ ] Secrets configurados en GitHub
- [ ] Cloudflare Pages conectado
- [ ] Primer deploy exitoso (visible en cloudflare.com)
- [ ] Dominio configurado (ericwgustafson.com o cloudflare.page)

## 🚀 Siguientes Pasos

Una vez todo está en verde:

1. **Crear componentes base**: Header, Footer, Nav
2. **Diseñar páginas**: Home, Bio, Publicaciones, Contacto
3. **Agregar contenido**: Fotos, textos, links a Amazon
4. **Datos dinámicos**: JSON con libros agotados/disponibles
5. **Mapa interactivo**: Integrar coordenadas de viajes

---

**¿Preguntas?** Documentar en Issues del repo o en este chat.

