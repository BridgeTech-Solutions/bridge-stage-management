"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/shared/db/prisma";
import { AuthorizationError, requireManager } from "@/shared/auth/guards";
import { attestationIssueSchema, parseDateOnly } from "./schema";

export type AttestationActionState = {
  error?: string;
  success?: boolean;
};

/**
 * Enregistre la période réellement effectuée par le stagiaire.
 *
 * Seul un dossier ACCEPTED peut être attesté : délivrer une attestation pour une
 * candidature refusée ou encore en traitement produirait un faux.
 */
export async function saveInternshipPeriod(
  requestId: string,
  _prev: AttestationActionState,
  formData: FormData
): Promise<AttestationActionState> {
  try {
    await requireManager();

    const parsed = attestationIssueSchema.safeParse({
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
    });

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Données invalides.";
      return { error: firstError };
    }

    const request = await prisma.internshipRequest.findUnique({
      where: { id: requestId },
      select: { status: true },
    });

    if (!request) {
      return { error: "Candidature introuvable." };
    }

    if (request.status !== "ACCEPTED") {
      return {
        error:
          "Seule une candidature acceptée peut donner lieu à une attestation de stage.",
      };
    }

    await prisma.internshipRequest.update({
      where: { id: requestId },
      data: {
        startDate: parseDateOnly(parsed.data.startDate),
        endDate: parseDateOnly(parsed.data.endDate),
      },
    });

    revalidatePath(`/admin/${requestId}`);

    return { success: true };
  } catch (error) {
    if (error instanceof AuthorizationError) {
      return { error: "Accès non autorisé." };
    }
    console.error(
      `[attestation] Erreur lors de l'enregistrement de la période ${requestId}:`,
      error
    );
    return { error: "Une erreur est survenue lors de l'enregistrement." };
  }
}
