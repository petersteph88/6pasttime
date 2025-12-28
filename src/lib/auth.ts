// src/lib/auth.ts
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions = {
  providers: [
    TwitterProvider({
      consumerKey: process.env.TWITTER_CONSUMER_KEY!,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET!,
      // No version specified = OAuth 1.0A
      authorization: { params: { scope: "tweet.read users.read offline.access" } },
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