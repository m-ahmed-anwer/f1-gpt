import { compare } from "bcrypt-ts";
import NextAuth, { type User, type Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./app/(auth)/auth-config";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getUser } from "./lib/queries";
import { PrismaClient } from "@prisma/client";

interface ExtendedSession extends Session {
  user: User;
}

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const existingUser = await getUser(credentials.email as string);

        if (!existingUser) {
          return null;
        }

        const valid = await compare(
          credentials.password as string,
          existingUser.password
        );

        if (!valid) {
          return null;
        }

        return {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
        };
      }
      return session;
    },
  },
});
