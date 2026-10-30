import { MongoClient } from 'mongodb';
import { Resend } from 'resend';
import { z } from 'zod';

/**
 * Contact endpoint: validates with Zod, rate-limits per IP, persists the
 * message to MongoDB (source of truth for the admin inbox), then forwards
 * it by email on a best-effort basis — the inbox keeps the message even
 * if Resend is down.
 */

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = 'shaikhabubakar2380@gmail.com';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.').max(120),
  email: z.string().trim().email('A valid email is required.').max(200),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(10, 'Message is required (min 10 characters).').max(5000),
  /** Hidden honeypot — humans never fill it; bots get a fake success below. */
  website: z.string().max(500).optional(),
});

/** Fixed-window limiter: 5 submissions per 10 minutes per IP. */
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_PER_WINDOW = 5;
const WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  try {
    const ip = (request.headers.get('x-forwarded-for') ?? 'local').split(',')[0].trim();
    if (isRateLimited(ip)) {
      return Response.json({ error: 'Too many messages. Please try again later.' }, { status: 429 });
    }

    const body = contactSchema.safeParse(await request.json().catch(() => null));
    if (!body.success) {
      return Response.json({ error: body.error.issues[0]?.message ?? 'Invalid submission.' }, { status: 400 });
    }
    const { name, email, subject, message, website } = body.data;

    // Honeypot filled → almost certainly a bot. Pretend success, store nothing.
    if (website) {
      return Response.json({ ok: true });
    }

    const record = {
      id: crypto.randomUUID(),
      name,
      email,
      subject: subject || undefined,
      message,
      receivedAt: new Date().toISOString(),
      read: false,
    };

    // Persist first — the inbox is the source of truth.
    let stored = false;
    const uri = process.env.MONGODB_URI;
    if (uri) {
      try {
        const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
        await client.connect();
        await client
          .db(process.env.MONGODB_DB || 'portfolio')
          .collection('messages')
          .insertOne(record);
        await client.close();
        stored = true;
      } catch (dbError) {
        console.error('[send] failed to store message:', (dbError as Error).message);
      }
    }

    // Email is best-effort on top of the stored record.
    let emailed = false;
    try {
      const { error } = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [OWNER_EMAIL],
        replyTo: email,
        subject: subject || `New message from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject || '(none)')}</p>
          <hr />
          <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
        `,
      });
      emailed = !error;
    } catch (mailError) {
      console.error('[send] email delivery failed:', (mailError as Error).message);
    }

    if (!stored && !emailed) {
      return Response.json({ error: 'Could not deliver your message. Please email me directly.' }, { status: 500 });
    }

    return Response.json({ ok: true, stored, emailed });
  } catch {
    return Response.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}
