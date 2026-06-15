import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Crée un compte RH de test pour se connecter au back-office.
// Lancer avec : npm run db:seed
async function main() {
  const email = "rh@bridge.test";
  const password = await bcrypt.hash("password123", 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, password, name: "RH Démo", role: "ADMIN" },
  });

  console.log(`Compte RH de test prêt → ${email} / password123`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
