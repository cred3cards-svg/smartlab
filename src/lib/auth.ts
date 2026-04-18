import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // First try to find an Admin User
        const admin = await prisma.adminUser.findUnique({
          where: { email: credentials.email as string },
        });

        if (admin && admin.active) {
          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            admin.password
          );

          if (isPasswordValid) {
            return {
              id: admin.id,
              email: admin.email,
              name: admin.name,
              role: admin.role,
            };
          }
        }

        // If not admin, try Patient Account
        const patient = await prisma.patientAccount.findFirst({
          where: { 
            OR: [
              { email: credentials.email as string },
              { phone: credentials.email as string }
            ]
          },
        });

        if (patient && patient.active && patient.password) {
          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            patient.password
          );

          if (isPasswordValid) {
            return {
              id: patient.id,
              email: patient.email || patient.phone,
              name: patient.name || "Patient",
              role: patient.role,
            };
          }
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});
