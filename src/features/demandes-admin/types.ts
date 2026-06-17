import type { InternshipRequest, Profile, Document } from "@prisma/client";

/**
 * Type enrichi d'une demande de stage avec ses relations.
 */
export type InternshipRequestWithRelations = InternshipRequest & {
  profile: Profile | null;
  documents: Document[];
};

/**
 * Type pour le statut d'une demande.
 */
export type RequestStatus = "PENDING" | "PROCESS" | "ACCEPTED" | "REJECTED";

/**
 * Dictionnaire de correspondance des statuts avec labels et couleurs.
 */
export const statusMap: Record<RequestStatus, { label: string; badge: string }> = {
  PENDING: {
    label: "En attente",
    badge: "badge-warning",
  },
  PROCESS: {
    label: "En traitement",
    badge: "badge-info",
  },
  ACCEPTED: {
    label: "Acceptée",
    badge: "badge-success",
  },
  REJECTED: {
    label: "Rejetée",
    badge: "badge-error",
  },
};

/**
 * Dictionnaire pour les types de stage.
 */
export const internshipTypeMap: Record<string, string> = {
  ACADEMIC: "Stage académique",
  PROFESSIONAL: "Stage professionnel",
};

/**
 * Version sérialisée d'une `InternshipRequestWithRelations` pour les composants client.
 * Les `Date` sont converties en `string | null` pour éviter les problèmes de sérialisation
 * entre Server Components et Client Components.
 */
export type InternshipRequestSerialized = Omit<
  InternshipRequestWithRelations,
  "createdAt" | "updatedAt" | "profile" | "documents"
> & {
  createdAt: string | null;
  updatedAt: string | null;
  profile: Profile | null;
  documents: (Omit<Document, "createdAt"> & { createdAt: string | null })[];
};
