import { loginUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        
      },
      async authorize(credentials, req) {
        const user = await loginUser(credentials)
        return user
      },
    }),
  ],
};
