import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github, Instagram, Rss } from 'lucide-react';
import {
  footerContentLinks,
  footerTopicLinks,
  footerConnectLinks,
  footerLegalLinks,
} from '@/data/navigation';

export function Footer() {
  return (
    <footer className="border-t border-border-primary bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="inline-block font-mono text-lg font-bold text-white">
              <span className="text-accent-orange">~/</span>abubakarshaikh
            </Link>
            <p className="text-sm leading-relaxed text-text-secondary">
              Full Stack Software Engineer specializing in
              <br />
              scalable MERN apps and DevOps architectures.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/in/abubakar-shaikh-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted transition-colors hover:text-accent-orange"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://x.com/abubakarshaikh_dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted transition-colors hover:text-accent-orange"
                aria-label="X / Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/abubakar-shaikh-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted transition-colors hover:text-accent-orange"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/abubakarshaikh.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted transition-colors hover:text-accent-orange"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="/feed.xml"
                className="text-text-muted transition-colors hover:text-accent-orange"
                aria-label="RSS Feed"
              >
                <Rss className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Content Column */}
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-accent-orange">
              Content
            </h3>
            <ul className="space-y-3">
              {footerContentLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics Column */}
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-accent-orange">
              Topics
            </h3>
            <ul className="space-y-3">
              {footerTopicLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-accent-orange">
              Connect
            </h3>
            <ul className="space-y-3">
              {footerConnectLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('http') ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-text-secondary transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-sm text-text-secondary transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border-primary">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 py-6 sm:flex-row">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} Abubakar Shaikh. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {footerLegalLinks.map((link) => (
              <span key={link.href} className="flex items-center gap-4">
                <Link
                  to={link.href}
                  className="text-sm text-text-muted transition-colors hover:text-text-secondary"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
