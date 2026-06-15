# Slice 3 — Gestion des demandes / Back-office RH (à réaliser)

**Acteur :** RH · **Référence :** document MVP, section 7.3

## Objectif
Permettre à l'équipe RH de se connecter, consulter les demandes, lire les
documents et faire évoluer le statut.

## Fichiers attendus
- `queries.ts` — liste des demandes, détail d'une demande
- `actions.ts` — Server Action : changer le statut (déclenche la Slice 4)
- `components/` — table des demandes, vue détail, lecteur PDF, sélecteur de statut
- routes : `src/app/admin/page.tsx` (liste), `src/app/admin/[id]/page.tsx` (détail),
  `src/app/admin/login/page.tsx` (connexion)

## Auth
La connexion est déjà câblée (`shared/auth/auth.ts`, NextAuth Credentials).
Protéger les pages `admin` : rediriger vers `/admin/login` si `await auth()` est nul.
Créer un compte RH de test via le script de seed (voir README racine).

## Checklist (Definition of Done)
- [ ] Accès `admin` protégé (visiteur non connecté redirigé)
- [ ] Liste : nom candidat, type, date, statut + filtre simple par statut
- [ ] Vue détail : toutes les infos candidat + demande
- [ ] PDF visualisables dans le navigateur (pas de téléchargement obligatoire)
- [ ] Changement de statut (PENDING → PROCESS → ACCEPTED / REJECTED)
- [ ] Chaque changement déclenche l'email (Slice 4)
