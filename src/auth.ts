import NextAuth from 'next-auth';
import RedditProvider from 'next-auth/providers/reddit';
import { type DefaultSession } from 'next-auth';

import { type DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
    } & DefaultSession['user'];
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    accessToken?: string;
    id?: string;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  // jwt: true,
  providers: [
    RedditProvider({
      clientId: process.env.AUTH_REDDIT_ID,
      clientSecret: process.env.AUTH_REDDIT_SECRET,
      authorization:
        'https://www.reddit.com/api/v1/authorize?&scope=identity,read',
    }),
  ],
  callbacks: {
    jwt({ token, account }) {
      if (account?.provider === 'reddit') {
        return {
          ...token,
          accessToken: account.access_token,
          id: account.providerAccountId,
        };
      }
      return token;
    },
    session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id ?? '';
      return session;
    },
  },
});
