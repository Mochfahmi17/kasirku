import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { loginSchema } from "@/schema";
import bcrypt from "bcryptjs";
import { DEFAULT_LOGIN_REDIRECT, protectedRoutes } from "@/routes";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;
        const user = await db.user.findUnique({ where: { email } });
        if (!user || !user.password) return null;

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) return null;

        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const { nextUrl } = request;
      const isLoggedIn = !!auth?.user;
      const role = auth?.user.role;

      if (!isLoggedIn && protectedRoutes.includes(nextUrl.pathname)) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      if (isLoggedIn && nextUrl.pathname === "/login") {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }

      if (role === "kasir" && nextUrl.pathname === "/products") {
        return Response.redirect(new URL("/unauthorized", nextUrl));
      }

      return true;
    },

    async jwt({ token }) {
      try {
        if (!token.sub) return token;
        const user = await db.user.findUnique({ where: { id: token.sub } });
        if (!user) return token;
        token.role = user.role;
        return token;
      } catch (error) {
        console.log(error);
        return token;
      }
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
  },
});
