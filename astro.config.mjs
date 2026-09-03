import { defineConfig } from 'astro/config';
import cloudflare from 'astro/integrations/cloudflare';

export default defineConfig({
  integrations: [cloudflare()],
  output: 'hybrid',
  vite: {
    ssr: {
      external: ['svgo']
    }
  },
  site: 'https://ericwgustafson.com',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
