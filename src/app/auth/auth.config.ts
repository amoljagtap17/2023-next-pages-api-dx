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
} satisfies NextAuthOptions;
