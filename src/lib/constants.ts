export const SITE_NAME = 'Abubakar Shaikh';
export const SITE_DESCRIPTION = 'Full Stack Software Engineer specializing in building scalable MERN applications, APIs, and DevOps workflows.';
/** Canonical site origin — REQUIRED in the build environment
 *  (NEXT_PUBLIC_SITE_URL in .env.local / hosting platform). Falls back to
 *  localhost so a missing env fails visibly in URLs instead of silently
 *  pointing at a hardcoded production domain. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
export const SITE_TWITTER = '@abubakarshaikh_dev';
export const SITE_EMAIL = 'shaikhabubakar2380@gmail.com';

export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Open Source', href: '/open-source' },
  { label: 'Projects', href: '/projects' },
  { label: 'Research', href: '/research' },
  { label: 'Services', href: '/services' },
  { label: 'Thoughts', href: '/thoughts' },
  { label: 'Contact', href: '/contact' },
] as const;

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abubakar-shaikh-dev' },
  { label: 'GitHub', href: 'https://github.com/abubakar-shaikh-dev' },
  { label: 'X / Twitter', href: 'https://x.com/abubakarshaikh_dev' },
  { label: 'Instagram', href: 'https://instagram.com/abubakarshaikh.dev' },
] as const;

export const FOOTER_CONTENT_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Open Source', href: '/open-source' },
  { label: 'Projects', href: '/projects' },
  { label: 'Research', href: '/research' },
  { label: 'Services', href: '/services' },
  { label: 'Thoughts', href: '/thoughts' },
] as const;

export const FOOTER_TOPIC_LINKS = [
  { label: 'Backend & APIs', href: '/thoughts#backend' },
  { label: 'Infrastructure & DevOps', href: '/thoughts#devops' },
  { label: 'AI & Real-time Systems', href: '/thoughts#ai' },
  { label: 'Security & Cryptography', href: '/thoughts#security' },
] as const;

export const FOOTER_CONNECT_LINKS = [
  { label: 'Contact', href: '/contact' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abubakar-shaikh-dev' },
  { label: 'GitHub', href: 'https://github.com/abubakar-shaikh-dev' },
  { label: 'X / Twitter', href: 'https://x.com/abubakarshaikh_dev' },
  { label: 'Instagram', href: 'https://instagram.com/abubakarshaikh.dev' },
] as const;

export const FOOTER_LEGAL_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
] as const;
