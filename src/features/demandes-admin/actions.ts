"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../shared/db/prisma"; // Alignement sur ton instance Prisma réelle

export type AdminActionState = {
  error?: string;
  success?: boolean;
};

/**
 * Server Action : Met à jour le statut d'une demande de stage.
 * Sécurité : Valide que le statut transmis fait partie des choix autorisés.
 */
export async function updateCandidatureStatus(
  id: string,
  newStatus: "PENDING" | "PROCESS" | "ACCEPTED" | "REJECTED"
): Promise<AdminActionState> {
  try {
    // 1. Vérification de sécurité sur le statut
    const allowedStatuses = ["PENDING", "PROCESS", "ACCEPTED", "REJECTED"];
    if (!allowedStatuses.includes(newStatus)) {
      return { error: "Statut de candidature invalide." };
    }

    // 2. Mise à jour dans la base de données
    await prisma.internshipRequest.update({
      where: { id },
      data: {
        status: newStatus,
      },
    });

    // 3. Revalidation des pages de l'administration pour rafraîchir les données à l'écran
    revalidatePath("/admin");
    revalidatePath(`/admin/${id}`);

    return { success: true };
  } catch (error) {
    console.error(`[admin-actions] Erreur lors de la modification du statut de la demande ${id}:`, error);
    return {
      error: "Une erreur est survenue lors de la mise à jour du statut. Veuillez réessayer.",
    };
  }
}