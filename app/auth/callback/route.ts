import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.exchangeCodeForSession(code)
    
    // If this is a new signup (user just created), schedule welcome email
    if (session?.user) {
      const userCreatedAt = new Date(session.user.created_at);
      const now = new Date();
      const minutesSinceCreation = (now.getTime() - userCreatedAt.getTime()) / (1000 * 60);
      
      // If user was created less than 5 minutes ago, it's likely a new signup
      if (minutesSinceCreation < 5) {
        try {
          await fetch(`${origin}/api/welcome-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: session.user.id,
              email: session.user.email,
            }),
          });
        } catch (error) {
          console.error('Failed to schedule welcome email:', error);
          // Don't block the auth flow if email scheduling fails
        }
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${origin}/`)
}
