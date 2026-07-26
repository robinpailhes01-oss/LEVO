import { Hotel, Home, UtensilsCrossed, ConciergeBell } from "lucide-react";

const AUDIENCE = [
  { icon: Hotel, label: "Hôtels" },
  { icon: ConciergeBell, label: "Conciergeries" },
  { icon: Home, label: "Locations & yachts" },
  { icon: UtensilsCrossed, label: "Restaurants" },
];

export function AgentWhatsappHero() {
  return (
    <section className="pt-40 pb-20 sm:pt-48 sm:pb-24" style={{ background: "#f4f3ef" }}>
      <div className="mx-auto max-w-container px-5 text-center lg:px-12">
        <p className="section-label mx-auto justify-center">Agent IA WhatsApp + CRM sur-mesure</p>
        <h1
          className="mx-auto mt-6 max-w-3xl font-body text-4xl font-black leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl"
          style={{ color: "#111111" }}
        >
          Ne laissez plus jamais une demande WhatsApp sans réponse.
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-body text-lg leading-relaxed" style={{ color: "rgba(17,17,17,0.60)" }}>
          Un agent IA répond, qualifie et classe chaque conversation dans un CRM pensé
          pour votre activité — vous gardez la main sur tout, sans effort.
        </p>

        <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-3">
          {AUDIENCE.map((a) => (
            <span
              key={a.label}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-body text-sm font-semibold"
              style={{ background: "#ffffff", border: "1px solid rgba(17,17,17,0.10)", color: "#111111" }}
            >
              <a.icon size={15} strokeWidth={2} style={{ color: "#1A3BFF" }} />
              {a.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
