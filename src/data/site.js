// General site configuration: contact info, navigation, and social links.
// Contact values are read from environment variables (see .env.example)
// and fall back to a placeholder if unset, so the site always builds.

export const site = {
  author: 'Eric Gustafson',
  bookTitle: 'Mexico Viking',
  shortDescription:
    'Author of Mexico Viking, a novel about Scandinavian and Mexican roots, adventure, and environmental conservation.',
};

export const contact = {
  email: import.meta.env.VITE_AUTHOR_EMAIL || 'contact@ericwgustafson.com',
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '',
  get whatsappUrl() {
    return this.whatsappNumber ? `https://wa.me/${this.whatsappNumber}` : null;
  },
};

export const social = {
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
