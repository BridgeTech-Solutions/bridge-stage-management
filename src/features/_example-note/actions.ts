"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/shared/db/prisma";
import { createNoteSchema } from "./schema";

// 3) ÉCRITURES — les Server Actions (mutations) de la slice.
//    Pattern recommandé pour les formulaires : (état précédent, FormData) -> état.
export type ActionState = { error?: string; success?: boolean };

export async function createNote(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Toujours RE-valider côté serveur, même si le client a déjà validé.
  const parsed = createNoteSchema.safeParse({
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Données invalides." };
  }

  await prisma.exampleNote.create({ data: { message: parsed.data.message } });

  // Rafraîchit la liste affichée sur la page.
  revalidatePath("/exemple");
  return { success: true };
}
