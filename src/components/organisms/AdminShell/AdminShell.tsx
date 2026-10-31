'use client';

import { useActionState, useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Briefcase,
  ExternalLink,
  FileText,
  FolderGit2,
  GitBranch,
  Inbox,
  Layers,
  LayoutDashboard,
  LogOut,
  Menu,
  ScrollText,
  X,
  type LucideIcon,
} from 'lucide-react';
import { logoutAction } from '@/app/admin/actions';
import { Modal } from '@/components/ui/modal';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { SPRING_DRAWER } from '@/lib/motion';

interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Match only the exact route (for /admin itself). */
  exact?: boolean;
}

const ADMIN_NAV: AdminNavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Messages', href: '/admin/messages', icon: Inbox },
  { label: 'Projects', href: '/admin/projects', icon: FolderGit2 },
  { label: 'Articles', href: '/admin/articles', icon: FileText },
  { label: 'Papers', href: '/admin/papers', icon: ScrollText },
  { label: 'Repos', href: '/admin/repos', icon: GitBranch },
  { label: 'Career', href: '/admin/career', icon: Briefcase },
  { label: 'Services & Skills', href: '/admin/services', icon: Layers },
];

function isActive(pathname: string, item: AdminNavItem) {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/admin"
      onClick={onClick}
      className="flex shrink-0 items-center px-6 py-6 font-mono text-lg font-medium text-white transition-colors duration-150"
    >
      <span className="text-accent">~/</span>backstage
    </Link>
  );
}

function SidebarNav({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  const linkClass = (active: boolean) =>
    `relative flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors duration-150 ease-out-premium ${
      active
        ? 'border-accent/20 bg-accent/10 text-accent'
        : 'border-transparent text-text-secondary hover:bg-bg-secondary hover:text-white'
    }`;

  return (
    <nav aria-label="Admin sections" className="flex-1 overflow-y-auto px-3 py-2">
      <p className="px-3 font-mono text-[10px] text-text-muted">// Manage</p>
      <ul className="mt-3 space-y-1">
        {ADMIN_NAV.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? 'page' : undefined}
                className={linkClass(active)}
              >
                {active && (
                  <span
                    className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                )}
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 px-3 font-mono text-[10px] text-text-muted">// Site</p>
      <ul className="mt-3 space-y-1">
        <li>
          <Link
            href="/"
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors duration-150 ease-out-premium hover:bg-bg-secondary hover:text-white"
          >
            <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
            View live site
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function SidebarFooter({ email }: { email: string }) {
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const [, signOut, isSigningOut] = useActionState(async () => {
    await logoutAction();
    return null;
  }, null);
  const [isDispatching, startTransition] = useTransition();
  const pending = isSigningOut || isDispatching;

  return (
    <div className="shrink-0 border-t border-border-primary/60 p-4">
      <p className="truncate px-1 font-mono text-[11px] text-text-muted" title={email}>
        {email}
      </p>
      <button
        type="button"
        onClick={() => setIsSignOutOpen(true)}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-border-primary px-3.5 py-2.5 font-mono text-xs text-text-secondary transition-colors duration-150 hover:border-accent hover:text-accent active:scale-97"
      >
        <LogOut className="h-3.5 w-3.5" aria-hidden="true" /> Sign out
      </button>
      <Modal
        open={isSignOutOpen}
        title="Sign out?"
        description="You will need to sign in again to manage your content."
        okText="Sign out"
        confirmLoading={pending}
        onOk={() => startTransition(() => signOut())}
        onCancel={() => {
          if (!pending) setIsSignOutOpen(false);
        }}
        maskClosable={!pending}
        keyboard={!pending}
      />
    </div>
  );
}

/**
 * Authenticated admin chrome: fixed sidebar on desktop, slide-in drawer
 * behind a sticky top bar on mobile. Children stay server-rendered.
 */
export function AdminShell({ email, children }: { email: string; children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  // Close the drawer when the route changes (also covers back/forward).
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  if (renderedPathname !== pathname) {
    setRenderedPathname(pathname);
    setIsDrawerOpen(false);
  }

  useBodyScrollLock(isDrawerOpen);

  useEffect(() => {
    if (!isDrawerOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsDrawerOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isDrawerOpen]);

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border-primary/60 bg-bg-primary lg:flex">
        <Brand />
        <SidebarNav pathname={pathname} />
        <SidebarFooter email={email} />
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 border-b border-border-primary/60 bg-bg-primary lg:hidden">
        <div className="flex items-center justify-between px-5 py-3">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open admin menu"
            aria-expanded={isDrawerOpen}
            aria-controls="admin-drawer"
            className="-ml-2.5 rounded-md p-2.5 text-text-secondary transition-[color,transform] duration-150 ease-out-premium hover:text-accent active:scale-97"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
          <Link
            href="/admin"
            className="font-mono text-lg font-medium text-white transition-colors duration-150"
          >
            <span className="text-accent">~/</span>backstage
          </Link>
          <span className="w-10" aria-hidden="true" />
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 z-40 bg-black/70 lg:hidden"
            aria-hidden="true"
          />
        )}
        {isDrawerOpen && (
          <motion.aside
            key="drawer-panel"
            id="admin-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Admin menu"
            initial={shouldReduceMotion ? { opacity: 0 } : { x: '-100%' }}
            animate={shouldReduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { x: '-100%' }}
            transition={
              shouldReduceMotion
                ? { duration: 0.2 }
                : SPRING_DRAWER
            }
            className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-border-primary bg-bg-primary lg:hidden"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-border-primary/60 py-2 pl-6 pr-3">
              <Link href="/admin" className="font-mono text-lg font-bold tracking-tight text-white">
                <span className="text-accent">~/</span>backstage
              </Link>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close admin menu"
                className="rounded-md p-2.5 text-text-secondary transition-[color,transform] duration-150 ease-out-premium hover:text-accent active:scale-97"
                autoFocus
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <SidebarNav pathname={pathname} onNavigate={() => setIsDrawerOpen(false)} />
            <SidebarFooter email={email} />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="flex min-h-screen flex-col lg:pl-64">
        <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 sm:px-8 md:py-10 lg:px-10 lg:py-12">
          {children}
        </main>
      </div>
    </div>
  );
}
