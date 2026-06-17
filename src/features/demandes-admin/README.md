# Feature: Gestion des Demandes Admin (`demandes-admin`)

## ✅ Status : IMPLÉMENTÉE

Cette feature gère l'interface de back-office RH pour consulter et gérer les demandes de stage.

## Architecture & Organisation

Cette feature suit le pattern **Vertical Slice** : toute la logique métier est compartimentalisée dans un dossier autonome.

### Structure des fichiers

```
demandes-admin/
├── components/
│   ├── ServerRequestList.tsx      # Wrapper Server (fetche les données)
│   ├── RequestList.tsx             # Composant Client (UI interactive)
│   ├── RequestDetail.tsx           # Modal de détail avec gestion de statut
│   └── StatusBadge.tsx             # Composant réutilisable pour les statuts
├── queries.ts                      # Requêtes de lecture (Server)
├── actions.ts                      # Server Actions pour mutations
├── schema.ts                       # Validations Zod
├── types.ts                        # Types TypeScript et mappings
└── README.md                       # Ce fichier
```

### Patterns appliqués

#### 1. **Séparation Server / Client**
- **Server** : `queries.ts`, `actions.ts`, `ServerRequestList.tsx`
  - Accès direct à Prisma
  - Validation et logique métier
  - Pas d'état client
  
- **Client** : `RequestList.tsx`, `RequestDetail.tsx`, composants avec `"use client"`
  - Interactivité (useState, onClick)
  - Appels aux Server Actions
  - Pas d'accès à Prisma

#### 2. **Prisma Client - Singleton**
L'application importe `{ prisma }` depuis `@/shared/db/prisma` qui fournit une instance singleton :
```typescript
import { prisma } from "@/shared/db/prisma";
```
**Jamais** créer une nouvelle instance `PrismaClient()` dans les features.

#### 3. **Chemins d'importation absolus**
Tous les imports utilisent `@/` :
```typescript
import { prisma } from "@/shared/db/prisma";
import { getInternshipRequests } from "@/features/demandes-admin/queries";
```

#### 4. **Server Actions pour les mutations**
Les modifications passent par des Server Actions signées `"use server"` :
```typescript
// actions.ts
"use server";
export async function updateRequestStatus(id: string, status: string) { ... }

// RequestDetail.tsx (Client)
const result = await updateRequestStatus(requestId, newStatus);
```

---

## Flux de données

### 1. Chargement initial (Server → Client)
```
AdminPage (Server)
  ↓ auth check + redirect
  ↓ import ServerRequestList (Server)
    ↓ getInternshipRequests() (Prisma query)
    ↓ pass data to RequestList (Client)
      ↓ Display table with interactive buttons
```

### 2. Interaction utilisateur (Client → Server → Client)
```
RequestList (Client)
  ↓ user clicks "Gérer" button
  ↓ open RequestDetail modal (Client component)
    ↓ user selects new status
    ↓ call updateRequestStatus() (Server Action)
      ↓ validate input (Zod)
      ↓ update DB (Prisma)
      ↓ revalidate cache (Next.js)
      ↓ return success/error to Client
    ↓ show toast notification
```

---

## Fichiers principaux

### `queries.ts`
Requêtes de **lecture** uniquement. Sans side-effects.
```typescript
export async function getInternshipRequests() { ... }
export async function getInternshipRequestById(id: string) { ... }
```

### `actions.ts`
**Server Actions** pour modifications. Incluent validation Zod et revalidation.
```typescript
"use server";
export async function updateRequestStatus(id: string, status: string) { ... }
export async function getRequestStats() { ... }
```

### `schema.ts`
Validations **Zod** pour sécuriser les entrées utilisateur.
```typescript
export const updateRequestStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["PENDING", "PROCESS", "ACCEPTED", "REJECTED"]),
});
```

### `types.ts`
Types TypeScript et mappings UI (labels, couleurs DaisyUI).
```typescript
export const statusMap = {
  PENDING: { label: "En attente", badge: "badge-warning" },
  ACCEPTED: { label: "Acceptée", badge: "badge-success" },
  // ...
};
```

---

## Fonctionnalités implémentées

- ✅ Protection par authentification RH
- ✅ Tableau des demandes avec tri
- ✅ Vue détail modale avec tous les infos
- ✅ Changement de statut (PENDING → PROCESS → ACCEPTED / REJECTED)
- ✅ Affichage des documents joints
- ✅ Validation des entrées (Zod)
- ✅ Messages de feedback utilisateur
- ✅ Revalidation du cache après modifications

---

## Utilisation

### Import dans une autre feature
```typescript
// src/features/autre-feature/page.tsx
import { getInternshipRequests } from "@/features/demandes-admin/queries";
import { updateRequestStatus } from "@/features/demandes-admin/actions";

const requests = await getInternshipRequests();
const result = await updateRequestStatus(id, "ACCEPTED");
```

### Ajouter une nouvelle mutation
1. Créer la fonction dans `actions.ts` avec `"use server"`
2. Ajouter la validation dans `schema.ts`
3. Appeler depuis un composant Client

```typescript
// actions.ts
"use server";
export async function rejectRequest(id: string, reason: string) {
  const validated = rejectRequestSchema.parse({ id, reason });
  // ... update DB ...
  revalidatePath("/admin");
  return { success: true };
}
```

---

## Dépendances
- **Prisma** : ORM pour accès à la BD
- **Zod** : Validation des entrées
- **Next.js 14+** : Server Components, Server Actions
- **DaisyUI** : Composants UI (badges, buttons, table, modal)
- **TypeScript** : Typage strict

---

## Bonnes pratiques
✅ **À faire :**
- Utiliser `@/` pour tous les imports
- Utiliser `prisma` depuis `@/shared/db/prisma`
- Valider les inputs avec Zod dans les actions
- Appeler `revalidatePath()` après mutations
- Utiliser `useState` + Server Actions pour l'interactivité

❌ **À éviter :**
- Créer une nouvelle instance `PrismaClient()`
- Accès direct à Prisma depuis composants Client
- Mutations sans validation Zod
- Oublier `revalidatePath()` → cache pas mis à jour
- Imports relatifs (`../features/...`)
