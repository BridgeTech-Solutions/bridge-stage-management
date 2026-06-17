import { prisma } from "@/shared/db/prisma";
import type { InternshipRequestWithRelations } from "@/features/demandes-admin/types";
import type { Document } from "@prisma/client";

// Helper: convertit les objets Prisma (avec Date) en POJO sérialisables
const serializeRequest = (r: InternshipRequestWithRelations) => ({
  ...r,
  createdAt: r.createdAt ? r.createdAt.toISOString() : null,
  updatedAt: r.updatedAt ? r.updatedAt.toISOString() : null,
  // Le modèle `Profile` n'a pas de createdAt/updatedAt dans le schéma Prisma — on renvoie tel quel
  profile: r.profile ?? null,
  documents: Array.isArray(r.documents)
    ? (r.documents as Document[]).map((d) => ({
        ...d,
        createdAt: d.createdAt ? d.createdAt.toISOString() : null,
      }))
    : [],
});

/**
 * Récupère toutes les demandes de stage pour le tableau de bord RH.
 */
export const getInternshipRequests = async () => {
  try {
    const requests = await prisma.internshipRequest.findMany({
      include: {
        profile: true,
        documents: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return requests.map(serializeRequest);
  } catch (error) {
    console.error("Erreur [getInternshipRequests] :", error);
    return [];
  }
};

/**
 * Récupère une demande spécifique par son ID.
 */
export const getInternshipRequestById = async (id: string) => {
  try {
    const req = await prisma.internshipRequest.findUnique({
      where: { id },
      include: {
        profile: true,
        documents: true,
      },
    });

    if (!req) return null;
    return serializeRequest(req);
  } catch (error) {
    console.error(`Erreur [getInternshipRequestById] pour l'ID ${id} :`, error);
    return null;
  }
};