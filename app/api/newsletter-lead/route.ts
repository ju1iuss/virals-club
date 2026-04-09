import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const EMAIL_RE =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeEmail(raw: string) {
  return raw.trim().toLowerCase();
}

export async function POST(req: Request) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const emailRaw = typeof body.email === "string" ? body.email : "";
    const pagePath =
      typeof body.pagePath === "string" ? body.pagePath.slice(0, 2048) : null;

    const email = normalizeEmail(emailRaw);
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Ungültige E-Mail-Adresse" }, { status: 400 });
    }

    const supabaseAdmin = createClient(url, key);

    const { error } = await supabaseAdmin.from("newsletter_leads").insert({
      email,
      page_path: pagePath,
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ ok: true, duplicate: true });
      }
      console.error("newsletter_leads insert:", error);
      return NextResponse.json({ error: "Speichern fehlgeschlagen" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("newsletter-lead API:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
