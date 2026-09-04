# Addendum: Reestructurar Publications (3 estados de disponibilidad)

Pega esto en Claude Code, junto con (o después de) el brief de rediseño editorial.

---

Voy a reemplazar `src/data/libros.json` por un nuevo archivo `src/data/publications.json` con una estructura distinta y más completa (11 publicaciones reales de Eric Gustafson, no solo Mexico Viking).

**Cambios de esquema importantes**:
- Los campos ahora están en inglés: `title`, `subtitle`, `author`, `year`, `isbn`, `publisher`, `description`, `status`, `amazon`, `image`, `genres`, `pages`, `formats` (antes: `titulo`, `subtitulo`, `agotado`, `disponible`, `generos`, etc.)
- `status` reemplaza a los campos booleanos `disponible`/`agotado` de antes. Puede ser uno de tres valores:
  - `"available"` — se vende en Amazon, mostrar botón "Buy on Amazon" con link
  - `"inquire"` — no se vende directo, pero se puede preguntar por él. Mostrar botón "Inquire" que enlace a `/contact`
  - `"out_of_print"` — ya no disponible. Sin botón, solo mostrar como referencia bibliográfica

Pasos:

1. **Borra `src/data/libros.json`** y créalo de nuevo como `src/data/publications.json` con el contenido que te voy a pegar (viene en un archivo aparte que ya tienes).

2. **Actualiza todas las referencias** de `libros.json` → `publications.json` y de los nombres de campo en español → inglés en:
   - `src/pages/index.astro`
   - `src/pages/publicaciones.astro` (considera renombrar el archivo a `publications.astro` para consistencia con el resto del sitio en inglés — actualiza también el link en `site.js`/`navLinks`)
   - `src/components/CardLibro.astro` (considera renombrar a `PublicationCard.astro`)

3. **Rediseña la página de Publications con dos secciones**, ya que ahora hay 11 entradas y no todas son libros comprables:

   **Sección 1: "Books"** (arriba, la más visual)
   - Solo las publicaciones con `status: "available"` (Mexico Viking, Joe and Running Bear)
   - Cards grandes con portada, descripción completa, botón "Buy on Amazon"

   **Sección 2: "Selected Writings & Contributions"** (abajo, más editorial/discreta — piensa en una lista tipo bibliografía académica, no cards)
   - El resto de las 9 publicaciones (`inquire` y `out_of_print` mezcladas, ordenadas por año descendente)
   - Formato sugerido por entrada: Título (itálica, Newsreader) — Publisher, Year. Descripción breve en una línea.
   - Si `status === "inquire"`: agregar al final "→ Inquire" enlazando a `/contact`
   - Si `status === "out_of_print"`: agregar "Out of print" en texto pequeño, sin link
   - Sin imágenes en esta sección (muchas no tienen `image`)

4. **Actualiza `CardLibro.astro` (o el componente renombrado)** para manejar los 3 estados de `status` en vez del booleano anterior. El badge debe decir:
   - `available` → "Available" (punto verde `var(--color-available)`)
   - `inquire` → "Inquire for availability" (punto ocre `var(--color-accent-soft)`)
   - `out_of_print` → "Out of print" (punto gris `var(--color-soldout)`)

5. Verifica que el **Home** siga usando la primera publicación (`Mexico Viking`) como destacada — el `find`/`[0]` debe filtrar por `status === "available"` en vez de tomar simplemente el primer elemento del array, ya que ahora hay 11 entradas y la primera sigue siendo Mexico Viking pero es más seguro ser explícito.

6. Al terminar: `npm run dev`, revisa visualmente, `npm run build`, commit:
   ```
   git commit -m "Restructure publications: add full bibliography with 3 availability states"
   ```
   y `git push origin main`.

---

**Nota**: el subtítulo de Mexico Viking ("A Novel of Mexico's Environmental Challenges") sigue pendiente de confirmación final — está tomado del manuscrito pero podría cambiar. Si cambia, solo hay que editar ese campo en `publications.json`, nada más.
