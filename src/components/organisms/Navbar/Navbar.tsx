'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { NAV_LINKS } from '@/lib/constants';

export function Navbar() {
  const { isScrolled } = useScrollPosition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500"
        style={{ paddingTop: isScrolled ? '12px' : '0px' }}
        aria-label="Primary navigation"
      >
        <div
          className={`flex w-full items-center justify-between transition-all duration-500 ${
            isScrolled
              ? 'max-w-6xl rounded-full px-6 py-2.5 backdrop-blur-xl'
              : 'max-w-7xl px-6 py-4'
          }`}
          style={
            isScrolled
              ? {
                  backgroundColor: 'rgba(30, 14, 0, 0.88)',
                  boxShadow:
                    'rgba(255, 107, 0, 0.35) 0px 0px 0px 1px inset, rgba(255, 107, 0, 0.12) 0px 4px 32px',
                }
              : {
                  backgroundColor: 'transparent',
                  boxShadow:
                    'rgba(255, 107, 0, 0) 0px 0px 0px 1px inset, rgba(255, 107, 0, 0) 0px 0px 0px',
                }
          }
        >
          <Link
            href="/"
            className="font-mono text-lg font-bold tracking-tight text-white transition-colors"
          >
            <span className="text-accent-orange">~/</span>abubakarshaikh
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors hover:text-accent-orange ${
                  isActive(link.href)
                    ? 'text-accent-orange'
                    : isScrolled
                      ? 'text-white/80'
                      : 'text-text-secondary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className="rounded-sm p-2 text-text-secondary transition-colors hover:text-accent-orange md:hidden"
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
              aria-hidden="true"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-0 z-50 border-b-[3px] border-accent-orange bg-[#0a0a0a] md:hidden"
            >
              <div className="flex items-center justify-between border-b border-border-primary px-6 py-4">
                <span className="font-mono text-lg font-bold text-white">
                  <span className="text-accent-orange">~/</span>abubakarshaikh
                </span>
                <button
                  className="rounded-sm p-2 text-text-secondary hover:text-accent-orange"
                  aria-label="Close menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="px-6 py-10">
                <ul className="space-y-2">
                  {NAV_LINKS.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`block py-3 font-mono text-2xl font-bold uppercase tracking-wider transition-colors hover:text-accent-orange ${
                          isActive(link.href) ? 'text-accent-orange' : 'text-white'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
