import type { NextAuthConfig } from "next-auth";

const ADMIN_EMAILS = ["admin@velox.com", "daniel@velox.com"];

export const authConfig = {
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: ({ token, user }: any) => {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
        token.email = user.email;
      }
      // Always grant admin rights for admin emails — works in both edge middleware and Node.js
      if (token.email) {
        const adminEmail = (process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL || "").toLowerCase().trim();
        const isAdminEmail =
          ADMIN_EMAILS.includes(token.email) ||
          (adminEmail && token.email === adminEmail);
        if (isAdminEmail) {
          token.isAdmin = true;
        }
      }
      return token;
    },
    session: ({ session, token }: any) => {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.isAdmin = token.isAdmin as boolean;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  providers: [], // Populated in auth.ts — this config is edge-safe (no pg/drizzle)
  trustHost: true,
} satisfies NextAuthConfig;
