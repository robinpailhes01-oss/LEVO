import { getSupabaseAdmin } from "@/lib/supabase/server";
import { Card, PageHeader, EmptyState } from "@/components/dashboard/ui";
import type { Setting } from "@/lib/types/database";

export const dynamic = "force-dynamic";

async function getSettings(): Promise<Setting[]> {
  try {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase.from("settings").select("*").order("key");
    return (data ?? []) as Setting[];
  } catch {
    return [];
  }
}

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader
        title="Paramètres"
        subtitle="Configuration de l'agence (table settings)"
      />
      {settings.length === 0 ? (
        <EmptyState message="Aucun paramètre. Exécutez schema.sql pour initialiser la table settings." />
      ) : (
        <Card>
          <dl className="divide-y" style={{ borderColor: "#F0EBE0" }}>
            {settings.map((s) => (
              <div
                key={s.key}
                className="flex items-center justify-between py-3"
              >
                <dt className="font-body text-sm" style={{ color: "#4A5568" }}>
                  {s.key}
                </dt>
                <dd
                  className="font-body text-sm font-semibold"
                  style={{ color: "#0B1F4A" }}
                >
                  {JSON.stringify(s.value)}
                </dd>
              </div>
            ))}
          </dl>
        </Card>
      )}
    </>
  );
}
