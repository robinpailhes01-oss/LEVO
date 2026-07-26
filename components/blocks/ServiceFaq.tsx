import type { ServiceFaq as Faq } from "@/lib/services";

/**
 * Section FAQ d'une page service + schema FAQPage.
 * Le contenu est rendu en HTML (details/summary) pour rester lisible par Google
 * même sans JavaScript, et éligible aux résultats enrichis.
 */
export function ServiceFaq({ items, accent }: { items: Faq[]; accent: string }) {
  if (items.length === 0) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section className="py-20 sm:py-24" style={{ background: "#f4f3ef" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-container px-5 lg:px-12">
        <p
          className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.14em]"
          style={{ color: "rgba(17,17,17,0.40)" }}
        >
          Questions fréquentes
        </p>
        <h2
          className="max-w-xl font-body text-2xl font-bold tracking-[-0.02em] sm:text-3xl"
          style={{ color: "#111111" }}
        >
          Ce que l&apos;on nous demande le plus souvent
        </h2>

        <div className="mt-10 max-w-3xl space-y-3">
          {items.map((f) => (
            <details
              key={f.question}
              className="group overflow-hidden rounded-2xl"
              style={{ background: "#ffffff", border: "1px solid rgba(17,17,17,0.08)" }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5">
                <h3 className="font-body text-[15px] font-semibold" style={{ color: "#111111" }}>
                  {f.question}
                </h3>
                <span
                  aria-hidden
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-lg leading-none transition-transform duration-300 group-open:rotate-45"
                  style={{ background: `${accent}14`, color: accent }}
                >
                  +
                </span>
              </summary>
              <p
                className="px-5 pb-5 font-body text-[15px] leading-relaxed"
                style={{ color: "rgba(17,17,17,0.62)" }}
              >
                {f.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
