import { NextResponse, type NextRequest } from "next/server";

// Protège /dashboard/* : vérifie le cookie de session signé (HMAC-SHA256).
// Edge runtime → on utilise Web Crypto (pas le module Node `crypto`).

const SESSION_COOKIE = "levo_session";

async function verify(token: string | undefined, secret: string): Promise<boolean> {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );
  const expected = Array.from(new Uint8Array(mac))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  if (expected !== sig) return false;

  const expiry = Number(payload);
  return Number.isFinite(expiry) && expiry > Date.now();
}

export async function middleware(req: NextRequest) {
  const secret = process.env.AUTH_SECRET ?? "";
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const valid = await verify(token, secret);

  if (!valid) {
    const url = new URL("/login", req.url);
    url.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
