"use server";

import { prisma } from "@/shared/db/prisma";
import { updateRequestStatusSchema } from "@/features/demandes-admin/schema";
import type { RequestStatus } from "@/features/demandes-admin/types";
import { revalidatePath } from "next/cache";

/**
 * Met à jour le statut d'une demande de stage.
 * @param id - ID de la demande
 * @param status - Nouveau statut
 */
export async function updateRequestStatus(id: string, status: string) {
  try {
    // Validation
    const validated = updateRequestStatusSchema.parse({ id, status });

    // Mise à jour dans la BD
    const updated = await prisma.internshipRequest.update({
      where: { id: validated.id },
      data: {
        status: validated.status as RequestStatus,
        updatedAt: new Date(),
      },
      include: {
        profile: true,
        documents: true,
      },
    });

    // Revalidation du cache pour la page admin
    revalidatePath("/admin");

    return {
      success: true,
      data: updated,
      message: `Demande mise à jour avec le statut: ${validated.status}`,
    };
  } catch (error) {
    console.error("[updateRequestStatus] Erreur :", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue",
    };
  }
}

/**
 * Récupère les statistiques des demandes.
 */
export async function getRequestStats() {
  try {
    const total = await prisma.internshipRequest.count();
    const pending = await prisma.internshipRequest.count({
      where: { status: "PENDING" },
    });
    const accepted = await prisma.internshipRequest.count({
      where: { status: "ACCEPTED" },
    });
    const rejected = await prisma.internshipRequest.count({
      where: { status: "REJECTED" },
    });

    return {
      total,
      pending,
      accepted,
      rejected,
    };
  } catch (error) {
    console.error("[getRequestStats] Erreur :", error);
    return null;
  }
}
