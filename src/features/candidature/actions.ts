"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/shared/db/prisma";
import { uploadDocument } from "@/shared/storage/supabase";
import { validatePdf } from "@/shared/validation/file";
import { completeApplicationSchema } from "./schema";
import { randomBytes } from "crypto";
import type { InternshipType } from "@prisma/client";
import { notifySubmission } from "@/features/notifications/actions/send-notification"; // Import ajouté

export type ActionState = {
  error?: string;
  success?: boolean;
  trackingCode?: string;
};

const MAX_FILE_SIZE = 2 * 1024 * 1024; 

function generateTrackingCode(): string {
  return randomBytes(4)
    .toString("hex")
    .toUpperCase()
    .substring(0, 8);
}

export async function submitCandidature(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
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
      const firstError = parsed.error.issues[0]?.message ?? "Données invalides.";
      return { error: firstError };
    }

    const data = parsed.data;
    const internshipType = data.internshipType as InternshipType;

    const uploadedDocuments: { label: string; url: string }[] = [];

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("documents_") && value instanceof File && value.size > 0) {
        if (value.size > MAX_FILE_SIZE) {
          return { error: `Le fichier "${value.name}" est trop lourd.` };
        }
        const label = key.substring("documents_".length).split("_").slice(0, -1).join(" ");
        const validationError = validatePdf(value);
        if (validationError) return { error: validationError };

        try {
          const url = await uploadDocument(value, "temp");
          uploadedDocuments.push({ label: label || value.name, url });
        } catch (uploadError) {
          return { error: `Erreur lors de l'upload.` };
        }
      }
    }

    if (uploadedDocuments.length === 0) return { error: "Au moins un document requis." };

    const trackingCode = generateTrackingCode();
    const startDate = new Date(data.startDate);

    try {
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

      if (uploadedDocuments.length > 0) {
        await prisma.document.createMany({
          data: uploadedDocuments.map((doc) => ({
            label: doc.label,
            url: doc.url,
            requestId: internshipRequest.id,
          })),
        });
      }

      // --- CÂBLAGE : Notification automatique ---
      await notifySubmission(profile.email, `${profile.firstName} ${profile.lastName}`, trackingCode);

      revalidatePath("/candidature");
      return { success: true, trackingCode };

    } catch (dbError) {
      console.error("[candidature] Erreur:", dbError);
      return { error: "Erreur lors de la création de la demande." };
    }
  } catch (error) {
    return { error: "Erreur serveur." };
  }
}