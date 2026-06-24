"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/shared/db/prisma";
import { uploadDocument } from "@/shared/storage/supabase";
import { validatePdf } from "@/shared/validation/file";
import { completeApplicationSchema } from "./schema";
import { randomBytes } from "crypto";
import type { InternshipType } from "@prisma/client";

/**
 * ÉCRITURES — Server Action qui crée une demande de stage complète.
 * Pattern : (état précédent, FormData) -> ActionResult avec tracking code ou erreur.
 */

export type ActionState = {
  error?: string;
  success?: boolean;
  trackingCode?: string;
};

/**
 * Génère un code de suivi aléatoire et non devinable.
 */
function generateTrackingCode(): string {
  return randomBytes(4)
    .toString("hex")
    .toUpperCase()
    .substring(0, 8);
}

/**
 * Server Action : crée une candidature complète.
 * 1. Valide les données (Zod)
 * 2. Upload les fichiers sur Supabase
 * 3. Crée Profile + InternshipRequest + Document[] en base
 * 4. Retourne le code de suivi ou une erreur
 */
export async function submitCandidature(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    // ===== 1. Validation des données personnelles et parcours =====
    // Correction : Utilisation du champ 'phone' conforme au schema.ts
    const parsed = completeApplicationSchema.safeParse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      school: formData.get("school"),
      field: formData.get("field"),
      level: formData.get("level"),
      internshipType: formData.get("internshipType"),
      duration: formData.get("duration"),
      startDate: formData.get("startDate"),
      reportRequired: formData.get("reportRequired") === "true",
    });

    if (!parsed.success) {
      // Retourne la première erreur trouvée pour guider l'utilisateur
      const firstError = parsed.error.issues[0]?.message ?? "Données invalides.";
      return { error: firstError };
    }

    const data = parsed.data;
    const internshipType = data.internshipType as InternshipType;

    // ===== 2. Validation et upload des documents =====
    const uploadedDocuments: { label: string; url: string }[] = [];

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("documents_") && value instanceof File && value.size > 0) {
        const label = key
          .substring("documents_".length)
          .split("_")
          .slice(0, -1)
          .join(" ");

        const validationError = validatePdf(value);
        if (validationError) {
          return { error: validationError };
        }

        try {
          const url = await uploadDocument(value, "temp");
          uploadedDocuments.push({ label: label || value.name, url });
        } catch (uploadError) {
          console.error("[candidature] Upload error:", uploadError);
          return {
            error: `Erreur lors de l'upload du fichier. Veuillez réessayer.`,
          };
        }
      }
    }

    if (uploadedDocuments.length === 0) {
      return {
        error: "Au moins un document doit être uploadé.",
      };
    }

    // ===== 3. Créer le profil + demande + documents en base =====
    const trackingCode = generateTrackingCode();
    const startDate = new Date(data.startDate);

    try {
      // Créer le profil du candidat
      // Correction : Utilisation de data.phone unique
      const profile = await prisma.profile.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone, 
          school: data.school,
          field: data.field,
          level: data.level,
        },
      });

      // Créer la demande de stage
      const internshipRequest = await prisma.internshipRequest.create({
        data: {
          trackingCode,
          type: internshipType,
          duration: data.duration,
          startDate,
          reportRequired: data.reportRequired,
          status: "PENDING",
          profileId: profile.id,
        },
      });

      // Créer les documents associés
      if (uploadedDocuments.length > 0) {
        await prisma.document.createMany({
          data: uploadedDocuments.map((doc) => ({
            label: doc.label,
            url: doc.url,
            requestId: internshipRequest.id,
          })),
        });
      }

      // ===== 4. Revalider et retourner le code de suivi =====
      revalidatePath("/candidature");

      return {
        success: true,
        trackingCode,
      };
    } catch (dbError) {
      console.error("[candidature] Erreur base de données:", dbError);
      return {
        error:
          "Une erreur est survenue lors de la création de votre demande. Veuillez réessayer.",
      };
    }
  } catch (error) {
    console.error("[candidature] Erreur serveur:", error);
    return {
      error: "Erreur serveur. Veuillez réessayer plus tard.",
    };
  }
}