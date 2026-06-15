# Slice 4 — Notifications email (à réaliser)

**Acteur :** Système · **Référence :** document MVP, section 7.4

## Objectif
Informer automatiquement le candidat par email à chaque changement de statut
(et à la soumission, avec le code de suivi).

## Fichiers attendus
- `email.ts` — client d'envoi (ex. Resend) + fonctions `sendStatusChanged`, `sendSubmissionConfirmation`
- `templates/` — gabarits HTML des emails (en français, identité Bridge)

Cette slice est **transverse** : elle est appelée par la Slice 1 (confirmation)
et la Slice 3 (changement de statut).

## Checklist (Definition of Done)
- [ ] Email automatique au candidat à chaque changement de statut
- [ ] Email rappelle le statut + le code de suivi
- [ ] Contenu en français, aux couleurs Bridge
- [ ] Email de confirmation à la soumission (avec code de suivi)
- [ ] Un échec d'envoi ne bloque PAS le changement de statut (try/catch)
