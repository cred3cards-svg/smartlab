import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
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
              { phone: credentials.email as string } // Allow login with phone too
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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.sub = user.id; // Map id to sub for clarity
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).role = token.role as UserRole;
        (session.user as any).id = token.sub as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.AUTH_SECRET || "smartlab_dev_secret_2026",
});
