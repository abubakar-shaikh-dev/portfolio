import Link from 'next/link';
import { Linkedin, Twitter, Github, Instagram, Rss } from 'lucide-react';
import {
  FOOTER_CONTENT_LINKS,
  FOOTER_TOPIC_LINKS,
  FOOTER_CONNECT_LINKS,
  FOOTER_LEGAL_LINKS,
} from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-primary/60 bg-bg-primary">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-block font-mono text-lg font-bold text-white transition-colors duration-150 active:scale-97">
              <span className="text-accent">~/</span>abubakarshaikh
            </Link>
            <p className="text-sm leading-relaxed text-text-secondary">
              Full Stack Software Engineer specializing in
              <br />
              scalable MERN apps and DevOps architectures.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://www.linkedin.com/in/abubakar-shaikh-dev" target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition-[color,background-color,transform] duration-150 ease-out-premium hover:bg-bg-secondary hover:text-accent active:scale-95" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
              <a href="https://x.com/abubakarshaikh_dev" target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition-[color,background-color,transform] duration-150 ease-out-premium hover:bg-bg-secondary hover:text-accent active:scale-95" aria-label="X / Twitter"><Twitter className="h-4 w-4" /></a>
              <a href="https://github.com/abubakar-shaikh-dev" target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition-[color,background-color,transform] duration-150 ease-out-premium hover:bg-bg-secondary hover:text-accent active:scale-95" aria-label="GitHub"><Github className="h-4 w-4" /></a>
              <a href="https://instagram.com/abubakarshaikh.dev" target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition-[color,background-color,transform] duration-150 ease-out-premium hover:bg-bg-secondary hover:text-accent active:scale-95" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
              <a href="/feed.xml" className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition-[color,background-color,transform] duration-150 ease-out-premium hover:bg-bg-secondary hover:text-accent active:scale-95" aria-label="RSS Feed"><Rss className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-accent">// CONTENT</h3>
            <ul className="space-y-3">
              {FOOTER_CONTENT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary transition-colors duration-150 hover:text-white">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-accent">// TOPICS</h3>
            <ul className="space-y-3">
              {FOOTER_TOPIC_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-text-secondary transition-colors duration-150 hover:text-white">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-accent">// CONNECT</h3>
            <ul className="space-y-3">
              {FOOTER_CONNECT_LINKS.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('http') ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary transition-colors duration-150 hover:text-white">{link.label}</a>
                  ) : (
                    <Link href={link.href} className="text-sm text-text-secondary transition-colors duration-150 hover:text-white">{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border-primary/40">
        <div className="section-container flex flex-col items-center justify-between py-6 sm:flex-row">
          <p className="font-mono text-xs text-text-muted">&copy; {currentYear} Abubakar Shaikh. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0 font-mono text-xs">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <span key={link.href} className="flex items-center gap-4">
                <Link href={link.href} className="text-text-muted transition-colors duration-150 hover:text-text-secondary">{link.label}</Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
