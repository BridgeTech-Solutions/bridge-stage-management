import { prisma } from "@/shared/db/prisma";

// 2) LECTURES — toutes les requêtes Prisma de LECTURE de la slice vivent ici.
export function listNotes() {
  return prisma.exampleNote.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });
}
