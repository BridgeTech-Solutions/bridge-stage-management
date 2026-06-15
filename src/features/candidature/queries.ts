import { prisma } from "@/shared/db/prisma";

/**
 * LECTURES — Requêtes Prisma de LECTURE de la slice candidature.
 */

/**
 * Récupère les informations d'une demande par son code de suivi.
 * Utilisé pour afficher le suivi du candidat.
 */
export function getInternshipRequestByTrackingCode(trackingCode: string) {
  return prisma.internshipRequest.findUnique({
    where: { trackingCode },
    include: {
      profile: true,
      documents: true,
    },
  });
}
