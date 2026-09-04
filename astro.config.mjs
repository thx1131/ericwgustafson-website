import { defineConfig } from 'astro/config';

// Sitio estático: no se necesita adaptador SSR de Cloudflare.
// Cloudflare Pages sirve directamente la carpeta dist/ generada por "astro build".
export default defineConfig({
  output: 'static',
  site: 'https://ericwgustafson.com',
});
