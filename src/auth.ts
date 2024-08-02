import NextAuth from 'next-auth';
import RedditProvider from 'next-auth/providers/reddit';

export const { auth, handlers, signIn, signOut } = NextAuth({// jwt: true,
  providers: [
    RedditProvider({
      clientId: process.env.AUTH_REDDIT_ID,
      clientSecret: process.env.AUTH_REDDIT_SECRET,
      authorization:
        'https://www.reddit.com/api/v1/authorize?&scope=identity,read',
    }),
  ],
  callbacks: {
    jwt({ session, token, trigger, account }) {
      if (account?.provider === 'reddit') {
        return {
          ...token,
          accessToken: account.access_token,
          id: account.providerAccountId,
        };
      }
      return token;
    },
    session({ session, token, trigger, account }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      return session;
    },
  },
});
