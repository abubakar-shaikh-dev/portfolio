'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  User,
  Github,
  FolderGit2,
  Briefcase,
  PenLine,
  Mail,
  ArrowUpRight,
  Linkedin,
  Twitter,
  Instagram,
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants';

const LINK_ICONS = {
  '/about': User,
  '/open-source': Github,
  '/projects': FolderGit2,
  '/services': Briefcase,
  '/thoughts': PenLine,
  '/contact': Mail,
} as const;

const MENU_SOCIAL_ICONS = { LinkedIn: Linkedin, GitHub: Github, 'X / Twitter': Twitter, Instagram: Instagram };

export function Navbar() {
  const { isScrolled } = useScrollPosition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();

  useBodyScrollLock(isMobileMenuOpen);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <motion.nav
        initial={{ transform: shouldReduceMotion ? "translateY(0px)" : "translateY(-40px)", opacity: 0 }}
        animate={{ transform: "translateY(0px)", opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-[padding] duration-300 ease-out-premium ${isScrolled ? 'px-4' : 'px-0'}`}
        style={{ paddingTop: isScrolled ? '12px' : '0px' }}
        aria-label="Primary navigation"
      >
        <div
          className={`flex w-full items-center justify-between transition-[max-width,padding,background-color,box-shadow,border-radius] duration-300 ease-out-premium ${
            isScrolled
              ? 'max-w-5xl rounded-full px-6 py-2.5 border border-border-primary/80 bg-bg-secondary/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
              : 'section-container py-4'
          }`}
        >
          <Link
            href="/"
            className="font-mono text-lg font-bold tracking-tight text-white transition-colors duration-150 active:scale-97"
          >
            <span className="text-accent">~/</span>abubakarshaikh
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-[color,background-color] duration-150 ease-out-premium rounded-md ${
                  isActive(link.href)
                    ? 'text-accent font-semibold bg-accent/10 border border-accent/20'
                    : isScrolled
                      ? 'text-white/80 hover:text-white hover:bg-white/5'
                      : 'text-text-secondary hover:text-white hover:bg-bg-secondary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className="rounded-md p-2.5 text-text-secondary transition-[color,background-color,transform] duration-150 ease-out-premium hover:text-accent active:scale-95 lg:hidden"
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, filter: 'blur(14px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(12px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-[#0a0a0a]/85 backdrop-blur-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            {/* Luxury ambience — soft emerald glows over the frosted page */}
            <div className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-accent/10 blur-[110px]" />
            <div className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-accent/5 blur-[110px]" />

            <motion.div
              className="relative flex items-center justify-between border-b border-border-primary/40 px-6 py-5"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            >
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-mono text-lg font-bold tracking-tight text-white active:scale-97"
              >
                <span className="text-accent">~/</span>abubakarshaikh
              </Link>
              <button
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border-primary/60 text-text-secondary transition-colors duration-150 hover:border-accent/60 hover:text-accent active:scale-95"
                aria-label="Close menu"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </motion.div>

            <nav className="relative flex flex-1 flex-col justify-center px-6 py-8" aria-label="Mobile navigation">
              <ul>
                {NAV_LINKS.map((link, index) => {
                  const Icon = LINK_ICONS[link.href as keyof typeof LINK_ICONS];
                  const active = isActive(link.href);
                  return (
                    <motion.li
                      key={link.href}
                      initial={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, y: 28, scale: 0.94, filter: 'blur(6px)' }
                      }
                      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                      transition={
                        shouldReduceMotion
                          ? { duration: 0.2, delay: index * 0.03 }
                          : { delay: 0.12 + index * 0.055, type: 'spring', stiffness: 320, damping: 22, mass: 0.9 }
                      }
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group flex items-center gap-4 border-b border-border-primary/30 py-3.5 ${index === NAV_LINKS.length - 1 ? 'border-b-0' : ''}`}
                      >
                        <span className={`w-6 font-mono text-[11px] ${active ? 'text-accent' : 'text-text-muted'}`}>
                          0{index + 1}
                        </span>
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors duration-150 ${
                            active
                              ? 'border-accent/40 bg-accent/10 text-accent'
                              : 'border-border-primary/60 bg-bg-secondary/60 text-text-secondary group-hover:border-accent/40 group-hover:text-accent'
                          }`}
                        >
                          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                        </span>
                        <span
                          className={`font-display text-[26px] font-semibold tracking-tight transition-colors duration-150 ${
                            active ? 'text-accent' : 'text-white group-hover:text-accent'
                          }`}
                        >
                          {link.label}
                        </span>
                        <ArrowUpRight
                          className={`ml-auto h-4 w-4 transition-all duration-150 ${
                            active ? 'text-accent opacity-100' : 'text-text-muted opacity-0 group-hover:opacity-100'
                          }`}
                          aria-hidden="true"
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <motion.div
              className="relative border-t border-border-primary/40 px-6 py-6"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const SocialIcon = MENU_SOCIAL_ICONS[social.label as keyof typeof MENU_SOCIAL_ICONS];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border-primary/60 text-text-secondary transition-colors duration-150 hover:border-accent/60 hover:text-accent active:scale-95"
                    >
                      <SocialIcon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
              <p className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Available for full-stack &amp; cloud roles — India
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
