// prisma.config.ts
import "dotenv/config"; // Utile en local pour s'assurer que le .env est bien chargé
import path from "node:path";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // Le paramètre "classic" est requis pour préparer le terrain pour Prisma 7
  engine: "classic",
  
  // On définit la connexion à PostgreSQL ici au lieu du schema.prisma
  datasource: {
    url: env("DATABASE_URL"),
  },
  
  // On indique à Prisma où trouver tes modèles
  schema: path.join("prisma", "schema.prisma"),
});