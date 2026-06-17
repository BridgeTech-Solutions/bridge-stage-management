import { z } from "zod";

/**
 * Validation pour la mise à jour du statut d'une demande.
 */
export const updateRequestStatusSchema = z.object({
  id: z.string().min(1, "ID requis"),
  status: z.enum(["PENDING", "PROCESS", "ACCEPTED", "REJECTED"]),
});

export type UpdateRequestStatusInput = z.infer<typeof updateRequestStatusSchema>;

/**
 * Validation pour ajouter une note/commentaire.
 */
export const addNoteSchema = z.object({
  requestId: z.string().min(1, "ID de demande requis"),
  note: z.string().min(1, "Le commentaire ne peut pas être vide").max(500, "Max 500 caractères"),
});

export type AddNoteInput = z.infer<typeof addNoteSchema>;
