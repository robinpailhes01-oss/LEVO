import { getAudits } from "@/lib/dashboard/queries";
import { Card, PageHeader, EmptyState } from "@/components/dashboard/ui";

export const dynamic = "force-dynamic";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return "à l'instant";
  if (h < 24) return `il y a ${h} h`;
  return `il y a ${Math.floor(h / 24)} j`;
}

export default async function AuditsPage() {
  const audits = await getAudits();

  const totalPerte = audits.reduce(
    (s, a) => s + Number(a.perte_mensuelle_estimee ?? 0),
    0,
  );

  return (
    <>
      <PageHeader
        title="Audits gratuits"
        subtitle="Leads issus du formulaire d'audit du site vitrine"
      />

      {audits.length === 0 ? (
        <EmptyState message="Aucun audit pour l'instant. Ils apparaîtront ici dès qu'un visiteur complète le formulaire." />
      ) : (
        <>
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <Card>
              <p className="font-body text-xs font-semibold uppercase tracking-wider" style={{ color: "#9AA5B4" }}>
                Audits reçus
              </p>
              <p className="mt-2 font-display text-3xl font-bold" style={{ color: "#0B1F4A" }}>
                {audits.length}
              </p>
            </Card>
            <Card>
              <p className="font-body text-xs font-semibold uppercase tracking-wider" style={{ color: "#9AA5B4" }}>
                Perte cumulée détectée
              </p>
              <p className="mt-2 font-display text-3xl font-bold" style={{ color: "#0B1F4A" }}>
                {totalPerte.toLocaleString("fr-FR")} €
              </p>
            </Card>
            <Card>
              <p className="font-body text-xs font-semibold uppercase tracking-wider" style={{ color: "#9AA5B4" }}>
                Perte moyenne / lead
              </p>
              <p className="mt-2 font-display text-3xl font-bold" style={{ color: "#0B1F4A" }}>
                {Math.round(totalPerte / audits.length).toLocaleString("fr-FR")} €
              </p>
            </Card>
          </div>

          <Card padded={false}>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr style={{ borderBottom: "1px solid #E2D9C8" }}>
                    {["Contact", "Entreprise", "Perte /mois", "Heures/sem.", "Horizon", "Reçu"].map((h) => (
                      <th key={h} className="whitespace-nowrap px-6 py-4 font-body text-xs font-semibold uppercase tracking-wider" style={{ color: "#9AA5B4" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {audits.map((a) => (
                    <tr key={a.id} style={{ borderBottom: "1px solid #F0EBE0" }}>
                      <td className="px-6 py-4">
                        <p className="font-body text-sm font-semibold" style={{ color: "#0B1F4A" }}>
                          {[a.prenom, a.nom].filter(Boolean).join(" ") || "—"}
                        </p>
                        <p className="font-body text-xs" style={{ color: "#9AA5B4" }}>{a.email}</p>
                      </td>
                      <td className="px-6 py-4 font-body text-sm" style={{ color: "#4A5568" }}>
                        {a.entreprise ?? "—"}
                        {a.secteur ? <span className="block text-xs" style={{ color: "#9AA5B4" }}>{a.secteur}</span> : null}
                      </td>
                      <td className="px-6 py-4 font-body text-sm font-bold tabular-nums" style={{ color: "#1A3BFF" }}>
                        {Number(a.perte_mensuelle_estimee ?? 0).toLocaleString("fr-FR")} €
                      </td>
                      <td className="px-6 py-4 font-body text-sm tabular-nums" style={{ color: "#4A5568" }}>
                        {Number(a.heures_perdues_semaine ?? 0)} h
                      </td>
                      <td className="px-6 py-4 font-body text-sm" style={{ color: "#4A5568" }}>
                        {a.horizon ?? "—"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-body text-xs" style={{ color: "#9AA5B4" }}>
                        {timeAgo(a.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </>
  );
}
