import { getAllLeads } from "@/lib/dashboard/queries";
import { OrionBoard } from "@/components/dashboard/orion/OrionBoard";

export const dynamic = "force-dynamic";

export default async function OrionPage() {
  const leads = await getAllLeads();
  return <OrionBoard leads={leads} />;
}
