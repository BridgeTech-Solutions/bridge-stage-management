import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/shared/db/prisma";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client"; // Import indispensable pour le typage

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!passwordsMatch) return null;

        return { 
          id: user.id, 
          email: user.email, 
          name: user.name, 
          role: user.role 
        };
      },
    }),
  ],
  callbacks: {
    // On sauvegarde le rôle dans le token JWT
    jwt({ token, user }) {
      if (user) {
        token.role = user.role as Role;
      }
      return token;
    },
    // On injecte le rôle du token dans la session
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
});