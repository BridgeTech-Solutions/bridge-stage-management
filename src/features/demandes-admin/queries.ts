// src/features/demandes-admin/queries.ts
import { prisma } from "@/shared/db/prisma";

/**
 * Récupère toutes les candidatures pour le tableau de bord
 * Triées par date de création (les plus récentes en premier)
 */
export async function getCandidatures() {
  try {
    const candidatures = await prisma.candidature.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return candidatures;
  } catch (error) {
    console.error("Erreur lors de la récupération des candidatures :", error);
    return []; // Retourne un tableau vide en cas d'erreur pour éviter le plantage
  }
}

/**
 * Récupère une candidature spécifique par son ID (pour la page détail future)
 */
export async function getCandidatureById(id: string) {
  try {
    return await prisma.candidature.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`Erreur lors de la récupération de la candidature ${id} :`, error);
    return null;
  }
}