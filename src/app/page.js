import { signIn, signOut, auth } from '../auth';
import { useSession } from 'next-auth/react';
import React from 'react';
import { RedditButton, SignOutButton } from '../components/RedditButton';
import Link from 'next/link';

const Home = async () => {
  const session = await auth();
  console.log('session', session);
  return (
    <div>
      Home
      <h1>
        Welcome to Snappub - Your Gateway to Beautiful Wallpapers on Reddit
      </h1>
      {!session?.user.name ? <RedditButton /> : <Link href="/app">Go!</Link>}
    </div>
  );
};

export default Home;
