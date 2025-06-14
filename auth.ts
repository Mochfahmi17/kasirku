import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import { db } from "@/lib/db";
import { loginSchema } from "@/schema";
import bcrypt from "bcryptjs";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  protectedRoutes,
  resetPassword,
} from "@/routes";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google,
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
      const { nextUrl, cookies } = request;
      const isLoggedIn = !!auth?.user;

      const email = cookies.get("email_for_otp")?.value;
      const token = cookies.get("otp_verification")?.value;

      const isResetPasswordRoute = resetPassword.includes(nextUrl.pathname);
      if (!isLoggedIn && isResetPasswordRoute) {
        if (!email && !token) {
          return Response.redirect(new URL("/forgot-password", nextUrl));
        }
        return true;
      }

      const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
      if (isApiAuthRoute) {
        return true;
      }

      const isAuthRoute = authRoutes.includes(nextUrl.pathname);
      if (isAuthRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return true;
      }

      const isDashboardRoute = protectedRoutes.some(
        (route) =>
          nextUrl.pathname === route ||
          nextUrl.pathname.startsWith(`${route}/`),
      );
      if (!isLoggedIn && isDashboardRoute) {
        return Response.redirect(new URL("/login", nextUrl));
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
