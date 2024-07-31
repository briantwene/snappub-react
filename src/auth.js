import NextAuth from 'next-auth';
import Reddit from 'next-auth/providers/reddit';

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Reddit({
      clientId: process.env.AUTH_REDDIT_ID,
      clientSecret: process.env.AUTH_REDDIT_SECRET,
      authorization: {
        params: {
          scope: 'read identity',
          duration: 'permanent',
        },
      },
    }),
  ],

  callbacks: {
    session({ session, token }) {
      console.log("token", token)
      session.user.id = token.id;
      return session;
    },
  },
});
