import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getAdminByEmail, recordLoginSuccess, recordLoginFail, ensureDefaultAdmin } from "@/lib/store";
import { verifyPassword, MAX_FAILED } from "@/lib/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt", maxAge: 60 * 60 * 8 },
  pages: { signIn: "/admin/login" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (creds) => {
        await ensureDefaultAdmin();
        const email = String(creds?.email ?? "");
        const password = String(creds?.password ?? "");
        const user = await getAdminByEmail(email);
        if (!user || user.status !== "active") return null;
        if (user.failedLoginCount >= MAX_FAILED) return null; // locked
        const ok = await verifyPassword(password, user.passwordHash);
        if (!ok) {
          await recordLoginFail(user.id, user.failedLoginCount);
          return null;
        }
        await recordLoginSuccess(user.id);
        return { id: user.id, email: user.email, name: user.fullName, role: user.role };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.uid = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.uid as string;
      session.user.role = token.role as string;
      return session;
    },
  },
});
