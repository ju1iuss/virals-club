import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { type, message, email, to: customTo } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const senderEmail = email || 'anonymous@tasy.ai';
    const subject = `[Support] ${type.toUpperCase()} Request from ${senderEmail}`;
    const recipientEmail = customTo || 'julius@tasy.ai';

    const { data, error } = await resend.emails.send({
      from: 'Virals Club Support <onboarding@resend.dev>', // Resend default for test
      to: [recipientEmail],
      subject: subject,
      replyTo: senderEmail,
      html: `
        <h2>New ${type} request</h2>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Email:</strong> ${senderEmail}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
          ${message.replace(/\n/g, '<br>')}
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
