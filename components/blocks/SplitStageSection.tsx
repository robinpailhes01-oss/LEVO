"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { useAudit } from "@/hooks/useAudit";

/**
 * Le pic de la page — grammaire « split stage ».
 *
 * Deux colonnes tenues en tension pendant tout l'acte, puis la résolution :
 * le séparateur voyage jusqu'au bord et la colonne « Avec » prend toute la
 * largeur. Ce basculement est le moment que le visiteur doit retenir.
 *
 * Un seul écouteur de scroll publie la progression de l'acte dans --p (0 à 1).
 * Tout le reste — découpe, opacités, glissements — est dérivé en CSS depuis
 * cette variable (voir globals.css). Ça garde une seule source de vérité,
 * permet un split horizontal sur desktop et vertical sur mobile sans logique
 * JS dupliquée, et laisse le CSS neutraliser proprement l'acte en mouvement
 * réduit.
 */

const SANS = [
  { time: "22h47", text: "« Vous avez de la place le 15 août ? »" },
  { time: "Le lendemain", text: "Vous répondez. Il a réservé ailleurs." },
  { time: "Cette semaine", text: "Trois devis en retard, deux relances oubliées." },
  { time: "Ce soir", text: "Vous rattrapez l'administratif au lieu de souffler." },
];

const AVEC = [
  { time: "22h47", text: "L'agent répond en trente secondes, dans votre ton." },
  { time: "22h48", text: "La demande est qualifiée et rangée dans votre CRM." },
  { time: "Le lendemain", text: "Le devis est déjà parti. La relance est programmée." },
  { time: "Ce soir", text: "Vous ne rattrapez rien. Il n'y a rien à rattraper." },
];

// Les entrées se chevauchent : la précédente tient encore quand la suivante
// arrive, pour qu'il n'y ait jamais de vide entre deux lignes.
const ITEM_START = (i: number) => 0.16 + i * 0.095;

export function SplitStageSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { openAudit } = useAudit();

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const travel = section.offsetHeight - window.innerHeight;
      if (travel <= 0) {
        stage.style.setProperty("--p", "1");
        return;
      }
      const p = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / travel));
      stage.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="split-act relative" aria-labelledby="split-heading">
      <h2 id="split-heading" className="sr-only">
        Votre journée sans Luma, et votre journée avec Luma
      </h2>

      <div ref={stageRef} className="split-stage sticky top-0 h-screen w-full overflow-hidden">
        {/* ── Colonne « Sans » ─────────────────────────────────────── */}
        <div className="split-panel split-panel--sans absolute inset-0">
          <div className="split-content split-content--sans absolute flex flex-col">
            <div className="px-7 sm:px-10 lg:px-14">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.14em]"
                style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.58)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#8A8F98" }} />
                Sans Luma
              </span>

              <p
                className="mt-6 font-body text-[1.6rem] font-black leading-[1.1] tracking-[-0.02em] sm:text-4xl"
                style={{ color: "rgba(255,255,255,0.92)" }}
              >
                Votre journée, aujourd&apos;hui.
              </p>

              <ul className="mt-7 list-none space-y-4">
                {SANS.map((item, i) => (
                  <SplitItem key={item.text} index={i} time={item.time} text={item.text} tone="sans" />
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Colonne « Avec » ─────────────────────────────────────── */}
        <div className="split-panel split-panel--avec absolute inset-0">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full opacity-40 blur-3xl"
            style={{ background: "#1A3BFF" }}
          />

          <div className="split-content split-content--avec absolute flex flex-col">
            <div className="px-7 sm:px-10 lg:px-14">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.14em]"
                style={{ background: "rgba(77,143,255,0.22)", color: "#B4CCFF" }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#4D8FFF" }} />
                Avec Luma
              </span>

              <p
                className="mt-6 font-body text-[1.6rem] font-black leading-[1.1] tracking-[-0.02em] sm:text-4xl"
                style={{ color: "#ffffff" }}
              >
                Votre journée, à partir de maintenant.
              </p>

              <ul className="mt-7 list-none space-y-4">
                {AVEC.map((item, i) => (
                  <SplitItem key={item.text} index={i} time={item.time} text={item.text} tone="avec" />
                ))}
              </ul>

              {/* La résolution — le moment où la colonne gagnante s'installe. */}
              <div className="split-resolve mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                <p
                  className="font-body text-[15px] font-semibold sm:text-base"
                  style={{ color: "#ffffff" }}
                >
                  40h récupérées chaque mois. Zéro demande oubliée.
                </p>
                <button
                  type="button"
                  onClick={() => openAudit("demo", "Agent IA WhatsApp + CRM")}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-body text-sm font-semibold transition-transform duration-200 hover:-translate-y-px"
                  style={{ background: "#ffffff", color: "#0B1B4D" }}
                >
                  Demander une démo <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Le séparateur — la chrome de cette grammaire. */}
        <div className="split-divider pointer-events-none absolute" aria-hidden />
      </div>

      {/* Réserve de scroll : c'est elle qui donne son amplitude au pic. */}
      <div className="split-spacer h-[320vh]" aria-hidden />
    </section>
  );
}

function SplitItem({
  index,
  time,
  text,
  tone,
}: {
  index: number;
  time: string;
  text: string;
  tone: "sans" | "avec";
}) {
  const isAvec = tone === "avec";

  return (
    <li
      className="split-item flex gap-3.5"
      style={{ "--from": ITEM_START(index) } as CSSProperties}
    >
      <span
        className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ background: isAvec ? "#4D8FFF" : "rgba(255,255,255,0.28)" }}
      />
      <span className="min-w-0">
        <span
          className="block font-body text-[10px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: isAvec ? "rgba(180,204,255,0.92)" : "rgba(255,255,255,0.56)" }}
        >
          {time}
        </span>
        <span
          className="mt-1 block font-body text-[15px] leading-relaxed sm:text-base"
          style={{ color: isAvec ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.66)" }}
        >
          {text}
        </span>
      </span>
    </li>
  );
}
