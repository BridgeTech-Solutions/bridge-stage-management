# Slice 2 — Suivi de dossier (à réaliser)

**Acteur :** Candidat · **Référence :** document MVP, section 7.2

## Objectif
Permettre au candidat de consulter l'état de sa demande via son code de suivi,
sans créer de compte.

## Fichiers attendus
- `schema.ts` — validation du code de suivi saisi
- `queries.ts` — `findUnique` sur `InternshipRequest` par `trackingCode`
- `components/` — formulaire de saisie du code + affichage du statut
- route : `src/app/suivi/page.tsx`

## Checklist (Definition of Done)
- [ ] Page publique de saisie du code de suivi
- [ ] Code valide → affiche le statut (`shared/ui/StatusBadge`) + infos clés
- [ ] Code invalide → message d'erreur clair, sans fuite d'information
- [ ] Impossible de deviner le dossier d'un autre (code aléatoire, pas séquentiel)
