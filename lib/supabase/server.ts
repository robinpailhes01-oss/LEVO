import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Client Supabase serveur (service role) pour la vitrine — utilisé uniquement
// par /api/demo pour enregistrer les leads dans la même base que le dashboard.
// La clé n'est jamais exposée au navigateur.

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null; // optionnel : la démo marche sans (email seul)
  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
