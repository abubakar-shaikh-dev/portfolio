import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    if (!name?.trim()) {
      return Response.json({ error: 'Name is required.' }, { status: 400 });
    }
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'A valid email is required.' }, { status: 400 });
    }
    if (!message?.trim() || message.trim().length < 10) {
      return Response.json(
        { error: 'Message is required (min 10 characters).' },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['shaikhabubakar2380@gmail.com'],
      replyTo: email,
      subject: subject?.trim() || `New message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || '(none)'}</p>
        <hr />
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ data });
  } catch {
    return Response.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}
