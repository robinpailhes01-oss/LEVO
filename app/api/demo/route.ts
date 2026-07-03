import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";

// Demande de démo depuis la vitrine :
// 1. enregistre le lead dans Supabase (table leads, source 'website') → visible dans le dashboard ORION
// 2. envoie le lien de démo au visiteur (Resend)
// 3. notifie Robin (Resend)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, html }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  let body: { email?: string; project?: string; company?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const project = body.project ?? "Projet Luma";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Email invalide" }, { status: 400 });
  }

  const demoUrl = process.env.NEXT_PUBLIC_DEMO_URL ?? "https://luma-agence.fr";

  // 1. Enregistre le lead (best-effort, ne bloque pas la démo si Supabase absent)
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      await supabase.from("leads").insert({
        full_name: null,
        company: body.company ?? null,
        email,
        source: "website",
        status: "new",
        notes: `Demande de démo — ${project}`,
        assigned_agent: "ORION",
      });
    } catch (err) {
      console.error("[demo] insert lead échoué:", err);
    }
  }

  // 2. Email au visiteur avec le lien de démo
  const visitorHtml = `<div style="font-family:system-ui,sans-serif;color:#111">
    <h2 style="font-weight:700">Votre démo Luma</h2>
    <p>Merci pour votre intérêt — voici votre accès à la démo :</p>
    <p><a href="${demoUrl}" style="display:inline-block;background:#1A3BFF;color:#fff;padding:12px 20px;border-radius:9999px;text-decoration:none">Découvrir la démo →</a></p>
    <p style="color:#666;font-size:14px">L'équipe Luma · Montpellier</p>
  </div>`;
  const visitorSent = await sendEmail(email, "Votre démo Luma", visitorHtml);

  // 3. Notification à Robin
  const robinTo = process.env.EMAIL_TO;
  if (robinTo) {
    await sendEmail(
      robinTo,
      `Nouvelle demande de démo — ${project}`,
      `<p>Nouvelle demande de démo.</p>
       <ul>
         <li><b>Email :</b> ${email}</li>
         <li><b>Projet :</b> ${project}</li>
         ${body.company ? `<li><b>Entreprise :</b> ${body.company}</li>` : ""}
       </ul>
       <p>Lead enregistré dans le dashboard (ORION).</p>`,
    );
  }

  return NextResponse.json({ ok: true, emailed: visitorSent });
}
