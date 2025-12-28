// src/lib/auth.ts
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      // No version = OAuth 1.0A (stable)
    }),
  ],
  callbacks: {
    async jwt({ token, account }: any) {
      if (account) {
        token.accessToken = account.oauth_token;
        token.accessTokenSecret = account.oauth_token_secret;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.accessTokenSecret = token.accessTokenSecret;
      return session;
    },
  },
};