import Link from 'next/link';
import { ArrowUpRight, FileText, FolderGit2, GitBranch, MailOpen } from 'lucide-react';
import { getUnreadCount } from './actions';
import { getAllMessages } from '@/data/queries/getMessages';
import { Reveal } from '@/components/atoms/Reveal';
import { getAllArticles } from '@/data/queries/getArticles';
import { getAllProjects } from '@/data/queries/getProjects';
import { getAllRepos } from '@/data/queries/getRepos';

export const dynamic = 'force-dynamic';

const STATS = [
  { label: 'Projects', icon: FolderGit2, href: '/projects' },
  { label: 'Articles', icon: FileText, href: '/thoughts' },
  { label: 'Repos', icon: GitBranch, href: '/open-source' },
] as const;

export default async function AdminDashboardPage() {
  const [projects, articles, repos, messages] = await Promise.all([
    getAllProjects(),
    getAllArticles(),
    getAllRepos(),
    getAllMessages(),
  ]);
  const unread = await getUnreadCount();

  const counts: Record<string, number> = {
    Projects: projects.length,
    Articles: articles.length,
    Repos: repos.length,
  };
  const latestArticles = articles.slice(0, 4);

  return (
    <div className="mx-auto max-w-5xl">
      <Reveal>
        <p className="font-mono text-xs text-text-muted">// Dashboard</p>
        <h1 className="font-display mt-2 text-3xl font-medium tracking-tight text-white md:text-4xl">
          Content Overview
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          Everything here is served live from MongoDB and published to the site within a minute.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Reveal key={stat.label} delay={index * 70}>
              <Link
                href={stat.href}
                className="group flex items-center justify-between rounded-xl border border-border-primary/80 bg-bg-secondary/60 p-6 transition-[border-color,transform] duration-150 ease-out-premium hover:border-accent/40 active:scale-98"
              >
                <div>
                  <p className="font-mono text-[10px] text-text-muted">{stat.label}</p>
                  <p className="font-display mt-1 text-3xl font-medium text-white">{counts[stat.label]}</p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-primary/60 bg-bg-primary text-text-secondary transition-colors duration-150 group-hover:border-accent/40 group-hover:text-accent">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          );
        })}

        <Reveal delay={210}>
          <Link
            href="/admin/messages"
            className="group flex items-center justify-between rounded-xl border border-border-primary/80 bg-bg-secondary/60 p-6 transition-[border-color,transform] duration-150 ease-out-premium hover:border-accent/40 active:scale-98"
          >
            <div>
              <p className="font-mono text-[10px] text-text-muted">Messages</p>
              <p className="font-display mt-1 text-3xl font-medium text-white">{messages.length}</p>
              {unread > 0 && (
                <p className="mt-1 font-mono text-[10px] text-accent">{unread} unread</p>
              )}
            </div>
            <span className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-border-primary/60 bg-bg-primary text-text-secondary transition-colors duration-150 group-hover:border-accent/40 group-hover:text-accent">
              <MailOpen className="h-4 w-4" aria-hidden="true" />
              {unread > 0 && (
                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-accent" />
              )}
            </span>
          </Link>
        </Reveal>
      </div>

      <Reveal delay={140}>
        <div className="mt-10">
          <div className="flex items-end justify-between">
            <h2 className="font-mono text-xs text-text-muted">// Latest articles</h2>
          </div>
          <ul className="mt-4 space-y-3">
            {latestArticles.map((article) => (
              <li
                key={article.id}
                className="flex flex-col justify-between gap-2 rounded-lg border border-border-primary/60 bg-bg-secondary/40 p-4 sm:flex-row sm:items-center"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{article.title}</p>
                  <p className="font-mono text-[10px] text-text-muted mt-0.5">
                    {article.date} · {article.category}
                  </p>
                </div>
                <Link
                  href={`/thoughts/${article.slug}`}
                  target="_blank"
                  className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs text-text-secondary transition-colors duration-150 hover:text-accent"
                >
                  view <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="mt-10">
          <h2 className="font-mono text-xs text-text-muted">// Manage</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Projects', href: '/admin/projects' },
              { label: 'Articles', href: '/admin/articles' },
              { label: 'Repos', href: '/admin/repos' },
              { label: 'Career', href: '/admin/career' },
              { label: 'Services & Skills', href: '/admin/services' },
              { label: 'Messages', href: '/admin/messages' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between rounded-lg border border-border-primary/60 bg-bg-secondary/40 px-4 py-3.5 text-sm font-medium text-white transition-colors duration-150 hover:border-accent/40"
              >
                {item.label}
                {item.label === 'Messages' && unread > 0 && (
                  <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[10px] text-black">{unread}</span>
                )}
                <ArrowUpRight className="h-3.5 w-3.5 text-text-muted transition-colors duration-150 group-hover:text-accent" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
