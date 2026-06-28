import { createHmac, timingSafeEqual } from "crypto";

// Auth dashboard simple : cookie signé HMAC, sans dépendance externe.
// Edge-compatible signing est fait via le helper Web Crypto dans middleware.ts ;
// ici (Node runtime, API routes) on utilise le module crypto.

export const SESSION_COOKIE = "levo_session";
const SESSION_TTL_DAYS = 30;

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET manquant dans .env.local");
  return secret;
}

/** Crée un token signé `expiry.signature` (Node runtime). */
export function createSessionToken(): string {
  const expiry = Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000;
  const payload = String(expiry);
  const sig = createHmac("sha256", getSecret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

/** Vérifie un token (Node runtime). */
export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;

  const expected = createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const expiry = Number(payload);
  return Number.isFinite(expiry) && expiry > Date.now();
}

/** Comparaison constante du mot de passe. */
export function checkPassword(input: string): boolean {
  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected) throw new Error("DASHBOARD_PASSWORD manquant dans .env.local");
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const SESSION_MAX_AGE = SESSION_TTL_DAYS * 24 * 60 * 60;
