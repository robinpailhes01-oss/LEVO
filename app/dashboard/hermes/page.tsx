import { getReports } from "@/lib/dashboard/queries";
import { HermesView } from "@/components/dashboard/hermes/HermesView";

export const dynamic = "force-dynamic";

export default async function HermesPage() {
  const reports = await getReports();
  return <HermesView reports={reports} />;
}
