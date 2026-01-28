import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Use Service Role Key to bypass RLS and access auth.users
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { userId, email } = await req.json();

    if (!userId || !email) {
      return NextResponse.json({ error: 'userId and email are required' }, { status: 400 });
    }

    // Check if email already sent
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('welcome_email_sent')
      .eq('id', userId)
      .single();

    if (profile?.welcome_email_sent) {
      return NextResponse.json({ message: 'Welcome email already scheduled' });
    }

    // Calculate send time: 2 hours from now
    const sendAt = new Date();
    sendAt.setHours(sendAt.getHours() + 2);

    // Schedule email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Julius | Virals Club <julius@tasy.ai>',
      to: [email],
      subject: 'Willkommen im Club 🚀',
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <p>Hey, ich bin Julius, Gründer vom Virals Club.</p>
          <p><strong>Du bist jetzt einer von uns!</strong> 🚀</p>
          <p>Ich bin super interessiert: Wie bist du auf uns gestoßen und was ist dein Background?</p>
          <p>Schreib mir auch gerne AI-Requests – wir haben ein Team, das ständig nach Insider-News schaut.</p>
          <p>Beste Grüße,<br>Julius</p>
        </div>
      `,
      scheduledAt: sendAt.toISOString(),
    });

    if (error) {
      console.error('Failed to schedule welcome email:', error);
      return NextResponse.json({ error: 'Failed to schedule email' }, { status: 500 });
    }

    // Mark as sent in database
    await supabaseAdmin
      .from('profiles')
      .update({ welcome_email_sent: true })
      .eq('id', userId);

    return NextResponse.json({ success: true, scheduledAt: sendAt.toISOString() });
  } catch (error) {
    console.error('Error scheduling welcome email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
