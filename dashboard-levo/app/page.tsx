import { redirect } from "next/navigation";

// La racine du dashboard redirige vers /dashboard (protégé par le middleware d'auth).
export default function Home() {
  redirect("/dashboard");
}
