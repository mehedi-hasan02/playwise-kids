import { loginUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnect } from "./dbConnect";
import { use } from "react";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const user = await loginUser({
          email: credentials.email,
          password: credentials.password,
        });
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // pages: {
  //   signIn: "/login",
  //   error: "/login", // <-- add this
  // },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const existing = await dbConnect(collections.USERS).findOne({
        email: user.email,
        // provider: account?.provider,
      });

      if (existing) return true;

      // if (existing) {
      //   // block login if this email was registered with a different provider
      //   if (existing.provider && existing.provider !== account?.provider) {
      //     return false; // or redirect to an error page explaining the conflict
      //   }
      //   return true;
      // }

      const newUser = {
        provider: account?.provider,
        email: user.email,
        name: user.name,
        image: user.image,
        role: "user",
      };
      const result = await dbConnect(collections.USERS).insertOne(newUser);

      return result.acknowledged;
      // return true
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    async session({ session, token, user }) {
      if (token) {
        ((session.role = token?.role), (session.email = token?.email));
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        if (account.provider == "google") {
          const dbUser = await dbConnect(collections.USERS).findOne({
            email: user.email,
          });
          ((token.role = dbUser?.role), (token.email = dbUser?.email));
        } else {
          ((token.role = user?.role), (token.email = user?.email));
        }
      }

      return token;
    },
  },
};
