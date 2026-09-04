// Configuración general del sitio: datos de contacto, navegación y redes.
// Los valores de contacto se toman de variables de entorno (ver .env.example)
// y caen a un placeholder si no están definidas, para que el sitio siempre compile.

export const site = {
  autor: 'Eric Gustafson',
  tituloLibro: 'Mexico Viking',
  descripcionCorta:
    'Author of Mexico Viking, a novel about Scandinavian and Mexican roots, adventure, and environmental conservation.',
};

export const contacto = {
  email: import.meta.env.VITE_AUTHOR_EMAIL || 'contacto@ericwgustafson.com',
  whatsappNumero: import.meta.env.VITE_WHATSAPP_NUMBER || '',
  get whatsappUrl() {
    return this.whatsappNumero ? `https://wa.me/${this.whatsappNumero}` : null;
  },
};

export const redes = {
  twitter: import.meta.env.VITE_TWITTER_URL || null,
  instagram: import.meta.env.VITE_INSTAGRAM_URL || null,
  linkedin: import.meta.env.VITE_LINKEDIN_URL || null,
};

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/bio', label: 'Biography' },
  { href: '/publications', label: 'Publications' },
  { href: '/contact', label: 'Contact' },
];
