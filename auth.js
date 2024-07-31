import NextAuth from 'next-auth';
import Reddit from 'next-auth/providers/reddit';

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Reddit({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      authorization: {
        params: {
          duration: 'permanent',
        },
      },
    }),
  ],
});
