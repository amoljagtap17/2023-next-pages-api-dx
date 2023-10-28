import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = {
          id: "123",
          name: "John Doe",
          email: "john.doe@test.com",
          picture: "http://unsplash/avatar",
          roles: ["admin"],
        };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        token.roles = user.roles;
        // @ts-ignore
        token.picture = user.picture;
      }

      return token;
    },
    session({ token, session }) {
      if (token?.roles) {
        // @ts-ignore
        session.user.roles = token.roles;
      }

      return session;
    },
  },
} satisfies NextAuthOptions;
