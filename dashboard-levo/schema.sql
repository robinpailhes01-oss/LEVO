-- ════════════════════════════════════════════════════════════════
-- LUMA — Schéma Supabase complet
-- À exécuter dans le SQL Editor du projet Supabase Luma.
-- Conforme à MASTER_PLAN.md section "1A. Schéma Supabase".
-- Idempotent : peut être ré-exécuté sans casser l'existant.
-- ════════════════════════════════════════════════════════════════

-- ───────────────────────────── clients ─────────────────────────────
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  sector TEXT,
  email TEXT,
  phone TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'churned', 'prospect')),
  mrr DECIMAL(10,2) DEFAULT 0,
  agent_name TEXT,
  notes TEXT,
  contract_start DATE,
  next_review DATE
);

-- ───────────────────────────── leads ───────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  full_name TEXT,
  company TEXT,
  sector TEXT,
  email TEXT,
  linkedin_url TEXT,
  instagram_handle TEXT,
  source TEXT CHECK (source IN ('instagram', 'linkedin', 'referral', 'website', 'cold_email')),
  score INTEGER DEFAULT 0 CHECK (score BETWEEN 0 AND 100),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'responded', 'qualified', 'proposal', 'won', 'lost')),
  last_touch TIMESTAMP,
  notes TEXT,
  assigned_agent TEXT DEFAULT 'ORION',
  pain_points TEXT[],
  enrichment_data JSONB
);

-- ──────────────────────── content_calendar ─────────────────────────
CREATE TABLE IF NOT EXISTS content_calendar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  title TEXT NOT NULL,
  theme TEXT CHECK (theme IN ('cas_client', 'hook_probleme', 'educatif', 'solution', 'methode')),
  platform TEXT[] DEFAULT '{instagram,facebook}',
  status TEXT DEFAULT 'idea' CHECK (status IN ('idea', 'approved_idea', 'drafted', 'approved_content', 'generating', 'ready', 'scheduled', 'published')),
  hook_slide1 TEXT,
  slides_content JSONB,
  image_prompts JSONB,
  generated_images TEXT[],
  caption TEXT,
  hashtags TEXT[],
  scheduled_at TIMESTAMP,
  published_at TIMESTAMP,
  created_by TEXT DEFAULT 'LUNA',
  approved_by TEXT,
  client_ref TEXT
);

-- ───────────────────────── content_slides ──────────────────────────
-- Détail slide par slide (référencé par AGENT_DEFINITIONS — content_slides + content_feedback)
CREATE TABLE IF NOT EXISTS content_slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  content_id UUID REFERENCES content_calendar(id) ON DELETE CASCADE,
  slide_number INTEGER NOT NULL,
  slide_type TEXT,
  title TEXT,
  body TEXT,
  attribution TEXT,
  image_prompt TEXT,
  generated_image_url TEXT,
  feedback_positive TEXT,
  feedback_negative TEXT,
  UNIQUE (content_id, slide_number)
);

-- ─────────────────────── content_performance ───────────────────────
CREATE TABLE IF NOT EXISTS content_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID REFERENCES content_calendar(id) ON DELETE CASCADE,
  measured_at TIMESTAMP DEFAULT NOW(),
  platform TEXT,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2),
  profile_visits INTEGER DEFAULT 0,
  link_clicks INTEGER DEFAULT 0
);

-- ─────────────────────────── agent_logs ────────────────────────────
CREATE TABLE IF NOT EXISTS agent_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  agent_name TEXT NOT NULL CHECK (agent_name IN ('LUNA', 'ORION', 'HERMES', 'LEA', 'VEILLE')),
  action TEXT NOT NULL,
  input_data JSONB,
  output_data JSONB,
  status TEXT DEFAULT 'success' CHECK (status IN ('success', 'error', 'pending', 'skipped')),
  duration_ms INTEGER,
  cost_tokens INTEGER,
  error_message TEXT
);

-- ──────────────────────────── proposals ────────────────────────────
CREATE TABLE IF NOT EXISTS proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT,
  amount DECIMAL(10,2),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'viewed', 'accepted', 'rejected')),
  sent_at TIMESTAMP,
  valid_until DATE,
  services JSONB,
  generated_by TEXT DEFAULT 'ORION'
);

-- ───────────────────────── weekly_reports ──────────────────────────
CREATE TABLE IF NOT EXISTS weekly_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  week_start DATE NOT NULL,
  week_end DATE NOT NULL,
  mrr_total DECIMAL(10,2),
  mrr_change DECIMAL(5,2),
  leads_new INTEGER DEFAULT 0,
  leads_qualified INTEGER DEFAULT 0,
  posts_published INTEGER DEFAULT 0,
  posts_avg_engagement DECIMAL(5,2),
  top_post_id UUID REFERENCES content_calendar(id),
  report_content TEXT,
  recommendations TEXT[],
  generated_by TEXT DEFAULT 'HERMES'
);

-- ──────────────────────── watched_accounts ─────────────────────────
CREATE TABLE IF NOT EXISTS watched_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT CHECK (platform IN ('instagram', 'linkedin')),
  handle TEXT NOT NULL,
  category TEXT,
  active BOOLEAN DEFAULT true,
  last_scraped TIMESTAMP
);

-- ──────────────────────────── settings ─────────────────────────────
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB,
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO settings (key, value) VALUES
  ('luna_auto_generate', 'false'),
  ('luna_posts_per_week', '3'),
  ('orion_daily_limit', '10'),
  ('hermes_report_day', '"monday"'),
  ('target_mrr', '5000'),
  ('agency_name', '"Luma"'),
  ('agency_location', '"Montpellier"')
ON CONFLICT (key) DO NOTHING;

-- ════════════════════════════════════════════════════════════════
-- Row Level Security — activée sur toutes les tables.
-- Le dashboard et les agents accèdent via la SERVICE ROLE KEY
-- (qui bypass la RLS). Aucune policy publique n'est créée :
-- la base est donc fermée à la clé anon par défaut (sécurité maximale).
-- ════════════════════════════════════════════════════════════════
ALTER TABLE clients             ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads               ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_calendar    ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_slides      ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_logs          ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals           ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_reports      ENABLE ROW LEVEL SECURITY;
ALTER TABLE watched_accounts    ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings            ENABLE ROW LEVEL SECURITY;

-- Index utiles pour le dashboard
CREATE INDEX IF NOT EXISTS idx_leads_status        ON leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_score         ON leads (score DESC);
CREATE INDEX IF NOT EXISTS idx_content_status      ON content_calendar (status);
CREATE INDEX IF NOT EXISTS idx_slides_content      ON content_slides (content_id, slide_number);
CREATE INDEX IF NOT EXISTS idx_agent_logs_created  ON agent_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_clients_status      ON clients (status);
