import { Mail, MailOpen, Trash2 } from 'lucide-react';
import { Reveal } from '@/components/atoms/Reveal';
import { getAllMessages } from '@/data/queries/getMessages';
import { deleteMessageAction, setMessageReadAction } from '../actions';
import { ConfirmSubmit } from '../confirm-submit';

export const dynamic = 'force-dynamic';

function formatDate(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? iso
    : date.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
}

export default async function AdminMessagesPage() {
  const messages = await getAllMessages();
  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="mx-auto max-w-5xl">
      <Reveal>
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-accent">// CONTACT_INBOX</p>
            <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-white">Messages</h1>
            <p className="mt-2 text-sm text-text-secondary">
              {messages.length} total · {unread} unread
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <ul className="mt-8 space-y-4">
          {messages.map((message) => (
            <li
              key={message.id}
              className={`rounded-xl border p-5 transition-colors duration-150 ${
                message.read
                  ? 'border-border-primary/60 bg-bg-secondary/40'
                  : 'border-accent/30 bg-bg-secondary/70'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 font-semibold text-white">
                    {message.read ? (
                      <MailOpen className="h-4 w-4 shrink-0 text-text-muted" aria-hidden="true" />
                    ) : (
                      <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    )}
                    {message.name}
                    {!message.read && (
                      <span className="rounded-full bg-accent/15 px-2 py-0.5 font-mono text-[10px] text-accent">
                        NEW
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 truncate font-mono text-xs text-text-secondary">
                    <a href={`mailto:${message.email}`} className="hover:text-accent">
                      {message.email}
                    </a>
                    {message.subject && <span> · {message.subject}</span>}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[10px] text-text-muted">
                  {formatDate(message.receivedAt)}
                </span>
              </div>

              <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-relaxed text-text-secondary">
                {message.message}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <form action={setMessageReadAction}>
                  <input type="hidden" name="id" value={message.id} />
                  <input type="hidden" name="read" value={message.read ? 'false' : 'true'} />
                  <button
                    type="submit"
                    className="rounded-md border border-border-primary px-3 py-2 font-mono text-xs text-text-secondary transition-colors duration-150 hover:border-accent hover:text-accent"
                  >
                    Mark as {message.read ? 'unread' : 'read'}
                  </button>
                </form>
                <a
                  href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject || 'Your message')}`}
                  className="rounded-md border border-border-primary px-3 py-2 font-mono text-xs text-text-secondary transition-colors duration-150 hover:border-accent hover:text-accent"
                >
                  Reply
                </a>
                <ConfirmSubmit
                  action={deleteMessageAction}
                  id={message.id}
                  title={`Delete message from ${message.name}?`}
                  description="This permanently deletes the message from your inbox."
                  triggerAriaLabel={`Delete message from ${message.name}`}
                  triggerClassName="rounded-md border border-border-primary px-3 py-2 font-mono text-xs text-text-secondary transition-colors duration-150 hover:border-red-500/60 hover:text-red-400"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                </ConfirmSubmit>
              </div>
            </li>
          ))}
          {messages.length === 0 && (
            <li className="rounded-lg border border-dashed border-border-primary/60 p-8 text-center font-mono text-xs text-text-muted">
              No messages yet — submissions from the contact form land here.
            </li>
          )}
        </ul>
      </Reveal>
    </div>
  );
}
