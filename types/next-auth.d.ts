import { Role } from "@prisma/client";
import { type DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: { role: string & DefaultSession["user"] };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
  }
}
