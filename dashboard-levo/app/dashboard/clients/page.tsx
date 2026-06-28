import { getAllClients } from "@/lib/dashboard/queries";
import { Card, PageHeader, Badge, EmptyState } from "@/components/dashboard/ui";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const clients = await getAllClients();

  return (
    <>
      <PageHeader
        title="Clients"
        subtitle="Portefeuille client et MRR"
      />
      {clients.length === 0 ? (
        <EmptyState message="Aucun client pour l'instant. Exécutez schema.sql puis ajoutez vos clients." />
      ) : (
        <Card padded={false}>
          <table className="w-full text-left">
            <thead>
              <tr style={{ borderBottom: "1px solid #E2D9C8" }}>
                {["Entreprise", "Contact", "Secteur", "MRR", "Statut"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-6 py-4 font-body text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "#9AA5B4" }}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} style={{ borderBottom: "1px solid #F0EBE0" }}>
                  <td
                    className="px-6 py-4 font-body text-sm font-semibold"
                    style={{ color: "#0B1F4A" }}
                  >
                    {c.company}
                  </td>
                  <td
                    className="px-6 py-4 font-body text-sm"
                    style={{ color: "#4A5568" }}
                  >
                    {c.name}
                  </td>
                  <td
                    className="px-6 py-4 font-body text-sm"
                    style={{ color: "#4A5568" }}
                  >
                    {c.sector ?? "—"}
                  </td>
                  <td
                    className="px-6 py-4 font-body text-sm font-semibold"
                    style={{ color: "#0B1F4A" }}
                  >
                    {Number(c.mrr).toLocaleString("fr-FR")} €
                  </td>
                  <td className="px-6 py-4">
                    <Badge status={c.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </>
  );
}
