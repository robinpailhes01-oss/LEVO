import type { Metadata } from "next";
import { Journey } from "@/components/journey/Journey";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/* L'accueil est un parcours : un seul monde que le scroll traverse.
   Le contenu profond vit sur /services, /realisations, /formations et
   /a-propos, tous liés depuis le chrome du parcours. */
export default function Home() {
  return (
    <main>
      <Journey />
    </main>
  );
}
