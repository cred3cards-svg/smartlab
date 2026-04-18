import type { NextAuthConfig } from "next-auth";

// Define role type manually to avoid importing from @prisma/client in middleware
type UserRole = "ADMIN" | "PATIENT";

export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.sub = user.id;
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
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      
      if (isAdminRoute) {
        if (isLoggedIn) return true;
        return false; // Redirect to login
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
