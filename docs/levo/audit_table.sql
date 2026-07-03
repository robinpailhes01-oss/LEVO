-- Table des audits gratuits (formulaire popup du site vitrine).
-- À exécuter dans le SQL Editor du projet Supabase Luma.

CREATE TABLE IF NOT EXISTS audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  prenom TEXT,
  nom TEXT,
  email TEXT NOT NULL,
  entreprise TEXT,
  secteur TEXT,
  taches TEXT[],
  temps_par_tache JSONB,
  demandes_semaine TEXT,
  temps_reponse TEXT,
  devis_semaine TEXT,
  temps_devis TEXT,
  clients_perdus TEXT,
  panier_moyen TEXT,
  horizon TEXT,
  perte_mensuelle_estimee INTEGER,
  heures_perdues_semaine DECIMAL
);

-- RLS activée : accès uniquement via la service role key (côté serveur).
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_audits_created ON audits (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audits_email ON audits (email);
