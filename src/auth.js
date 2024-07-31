import NextAuth from 'next-auth';
import RedditProvider from 'next-auth/providers/reddit';

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    RedditProvider({
      clientId: process.env.AUTH_REDDIT_ID,
      clientSecret: process.env.AUTH_REDDIT_SECRET,
      authorization:
        'https://www.reddit.com/api/v1/authorize?scope=identity+read',
    }),
  ],
});
