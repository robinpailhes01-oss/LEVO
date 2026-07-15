import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description: "Conditions Générales de Vente de Luma — Harmonie Group SASU.",
};

const UPDATED = "15 juillet 2026";

export default function CgvPage() {
  return (
    <main style={{ background: "#f4f3ef" }}>
      <div className="mx-auto max-w-3xl px-5 py-16 sm:py-24 lg:px-8">
        <Link
          href="/"
          className="font-serif text-2xl font-bold tracking-[-0.02em]"
          style={{ color: "#111111" }}
        >
          Luma
        </Link>

        <h1
          className="mt-8 font-body text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl"
          style={{ color: "#111111" }}
        >
          Conditions Générales de Vente
        </h1>
        <p className="mt-3 font-body text-sm" style={{ color: "rgba(17,17,17,0.5)" }}>
          Dernière mise à jour : {UPDATED}
        </p>

        <div className="prose-cgv mt-10 space-y-10">
          <Section n="1" title="Éditeur et identité">
            <p>
              Le site luma-agence.fr et les prestations « Luma » sont édités et exploités
              par <strong>Harmonie Group</strong>, société par actions simplifiée
              (SASU) au capital de 100 €, immatriculée au RCS de Marseille sous le
              numéro 991&nbsp;738&nbsp;733, dont le siège social est situé 61 rue du
              Rouet, 13008 Marseille. « Luma » est une marque de Harmonie Group.
            </p>
            <p>
              Certaines prestations peuvent être opérées en partenariat avec{" "}
              <strong>Nexos Digital LLC</strong>.
            </p>
            <p>
              Numéro de TVA intracommunautaire : FR07&nbsp;991&nbsp;738&nbsp;733.
              Contact : contact@luma-agence.fr.
            </p>
          </Section>

          <Section n="2" title="Objet">
            <p>
              Les présentes Conditions Générales de Vente (les « CGV ») régissent les
              relations contractuelles entre Harmonie Group (le « Prestataire ») et
              tout client professionnel (le « Client ») souscrivant à une prestation
              de conception, d&apos;automatisation, d&apos;intégration d&apos;agents IA,
              de développement de sites internet ou de tout autre service proposé par
              Luma. Toute commande implique l&apos;acceptation sans réserve des présentes
              CGV.
            </p>
          </Section>

          <Section n="3" title="Prestations">
            <p>
              Le Prestataire fournit des prestations sur-mesure définies dans un devis
              ou une proposition commerciale préalablement acceptée par le Client. Le
              périmètre, les livrables, les délais et le prix sont précisés dans ce
              document, qui prévaut en cas de contradiction avec les présentes CGV pour
              ce qui concerne les modalités spécifiques de la prestation.
            </p>
          </Section>

          <Section n="4" title="Devis et commande">
            <p>
              Chaque prestation fait l&apos;objet d&apos;un devis personnalisé, valable
              30 jours à compter de son émission. La commande est ferme dès la
              signature du devis ou son acceptation écrite (y compris par voie
              électronique) et, le cas échéant, le versement de l&apos;acompte indiqué.
            </p>
          </Section>

          <Section n="5" title="Prix et modalités de paiement">
            <p>
              Les prix sont indiqués en euros. Sauf mention contraire, un acompte est
              exigible à la commande, le solde étant dû à la livraison ou selon
              l&apos;échéancier prévu au devis. Les factures sont payables à réception,
              sauf délai convenu par écrit. Conformément à la loi, tout retard de
              paiement entraîne l&apos;application de pénalités au taux légal en vigueur
              ainsi qu&apos;une indemnité forfaitaire de 40 € pour frais de recouvrement.
            </p>
          </Section>

          <Section n="6" title="Délais et exécution">
            <p>
              Les délais communiqués sont donnés à titre indicatif. Le Prestataire
              s&apos;engage à mettre en œuvre tous les moyens raisonnables pour les
              respecter. La bonne exécution suppose la collaboration active du Client
              (fourniture des accès, contenus, validations et informations
              nécessaires). Tout retard imputable au Client suspend d&apos;autant les
              délais.
            </p>
          </Section>

          <Section n="7" title="Obligations du Client">
            <p>
              Le Client s&apos;engage à fournir des informations exactes, à disposer des
              droits nécessaires sur les éléments transmis (textes, images, marques,
              données) et à collaborer de bonne foi. Le Client demeure responsable de
              l&apos;usage qu&apos;il fait des livrables et des outils mis à sa disposition.
            </p>
          </Section>

          <Section n="8" title="Droit de rétractation">
            <p>
              Les prestations étant destinées à des clients professionnels dans le
              cadre de leur activité, le droit de rétractation prévu pour les
              consommateurs ne s&apos;applique pas. Les conditions d&apos;annulation
              éventuelles sont précisées au devis.
            </p>
          </Section>

          <Section n="9" title="Propriété intellectuelle">
            <p>
              Sauf stipulation contraire, les livrables spécifiques réalisés pour le
              Client lui sont cédés après paiement intégral. Le Prestataire conserve la
              propriété de ses savoir-faire, méthodes, briques logicielles réutilisables
              et outils préexistants. Le Prestataire se réserve le droit de mentionner
              la prestation à titre de référence commerciale, sauf demande écrite
              contraire du Client.
            </p>
          </Section>

          <Section n="10" title="Responsabilité">
            <p>
              Le Prestataire est tenu à une obligation de moyens. Sa responsabilité ne
              saurait être engagée en cas de dommage indirect, de perte de données, de
              chiffre d&apos;affaires ou d&apos;exploitation. En tout état de cause, la
              responsabilité du Prestataire est limitée au montant des sommes
              effectivement perçues au titre de la prestation concernée.
            </p>
          </Section>

          <Section n="11" title="Données personnelles">
            <p>
              Les données collectées sont traitées conformément au Règlement Général
              sur la Protection des Données (RGPD). Elles sont utilisées uniquement dans
              le cadre de la relation commerciale et ne sont jamais revendues. Le Client
              et les personnes concernées disposent d&apos;un droit d&apos;accès, de
              rectification et de suppression, exerçable à contact@luma-agence.fr.
            </p>
          </Section>

          <Section n="12" title="Droit applicable et litiges">
            <p>
              Les présentes CGV sont soumises au droit français. En cas de litige, et à
              défaut de résolution amiable, compétence est attribuée aux tribunaux
              compétents du ressort du siège social du Prestataire.
            </p>
          </Section>
        </div>

        <div className="mt-16 border-t pt-8" style={{ borderColor: "rgba(17,17,17,0.10)" }}>
          <Link
            href="/"
            className="font-body text-sm font-semibold"
            style={{ color: "#1A3BFF" }}
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-body text-lg font-bold" style={{ color: "#111111" }}>
        {n}. {title}
      </h2>
      <div
        className="mt-3 space-y-3 font-body text-[15px] leading-relaxed"
        style={{ color: "rgba(17,17,17,0.7)" }}
      >
        {children}
      </div>
    </section>
  );
}
