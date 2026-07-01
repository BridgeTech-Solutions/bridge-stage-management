import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // --- 1. MODIFIE CES VALEURS ---
  const email = "itouayohann31@gmail.com"; 
  const password = "lola1234"; 
  // ------------------------------
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {}, // Si l'admin existe déjà, on ne modifie rien
    create: {
      email,
      password: hashedPassword,
      name: "Administrateur",
      role: "ADMIN",
    },
  });

  console.log("✅ Admin créé avec succès :", admin.email);
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });