import { getAllContent } from "@/lib/dashboard/queries";
import { LunaBoard } from "@/components/dashboard/luna/LunaBoard";

export const dynamic = "force-dynamic";

export default async function LunaPage() {
  const items = await getAllContent();
  return <LunaBoard items={items} />;
}
