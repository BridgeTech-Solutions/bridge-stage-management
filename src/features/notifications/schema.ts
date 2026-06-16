import { z } from "zod";

// 1) VALIDATION — le schéma Zod décrit les données attendues.
//    Réutilisé côté client (avant envoi) et côté serveur (dans l'action).
export const createNoteSchema = z.object({
  message: z
    .string()
    .min(1, "Le message est requis.")
    .max(280, "280 caractères maximum."),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
