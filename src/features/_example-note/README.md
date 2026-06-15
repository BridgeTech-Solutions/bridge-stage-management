# Slice exemple — `_example-note`

> ⚠️ **Slice de DÉMONSTRATION.** Elle existe uniquement pour montrer le pattern
> *vertical slice*. **Copie-la comme modèle** pour tes vraies slices, puis
> **supprime-la** (ainsi que le modèle `ExampleNote` dans `prisma/schema.prisma`
> et la route `src/app/exemple/`).

## Ce qu'elle illustre

Une fonctionnalité complète, de l'UI à la base de données, dans **un seul dossier** :

| Fichier | Rôle | Couche |
|---|---|---|
| `schema.ts` | Validation des données (Zod) | Validation |
| `queries.ts` | Lectures Prisma | Données (lecture) |
| `actions.ts` | Server Actions / mutations | Données (écriture) |
| `components/NoteForm.tsx` | Formulaire (composant client) | UI |
| `components/NoteList.tsx` | Affichage (composant serveur) | UI |

La page qui assemble le tout : `src/app/exemple/page.tsx`.

## Les règles à retenir

1. **Tout ce qui est propre à la fonctionnalité reste dans sa slice.**
2. **Ce qui est partagé** (client Prisma, auth, Supabase, UI générique) vit dans `src/shared/`.
3. **Toujours valider côté serveur** (dans l'action), même si le client a déjà validé.
4. La page (`src/app/.../page.tsx`) se contente d'**assembler** les composants de la slice.

## Pour la tester en local

1. Configurer `DATABASE_URL` dans `.env`.
2. `npx prisma migrate dev` (crée la table `ExampleNote`).
3. `npm run dev` puis ouvrir http://localhost:3000/exemple
