# PROJECT_MEMORY.md — Mémoire de Levo

*Claude Code lit ce fichier au début de chaque session et le met à jour à la fin.*

---

## État du projet
- Phase actuelle : **Phase 0 — Pas encore commencé**
- Dernière session : Aucune (fichier initial)
- Prochaine action : Phase 1 — Créer les tables Supabase + MCP custom

---

## Décisions d'architecture prises
- MCP hébergé sur Vercel API routes (pas de service séparé)
- Mémoire persistante via ce fichier (pas GBrain)
- ORION utilise Instantly.ai (25 000 leads inclus) au lieu d'un système custom
- Auth dashboard simple (password + cookie signé, pas Clerk)
- Buffer reporté à plus tard (publication manuelle pour l'instant)

---

## Patterns établis
*(à remplir au fur et à mesure de la construction)*

---

## Pièges rencontrés
*(à remplir au fur et à mesure)*

---

## À faire prochaine session
1. Créer le projet Next.js 14 (ou utiliser le repo levo-plum existant)
2. Créer toutes les tables Supabase (SQL dans MASTER_PLAN.md Phase 1A)
3. Créer le MCP custom (MASTER_PLAN.md Phase 1B)
4. Tester la connexion MCP

---

## Notes importantes
- Site existant : levo-plum.vercel.app
- Robin valide les décisions importantes (Confusion Protocol)
- Robin fournit les clés API au fur et à mesure des besoins
