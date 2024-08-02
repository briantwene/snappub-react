import { auth } from '../auth';
import React from 'react';
import { RedditButton } from '../components/RedditButton';
import Link from 'next/link';

const Home = async () => {
  const session = await auth();
  return (
    <div>
      Home
      <h1>
        Welcome to Snappub - Your Gateway to Beautiful Wallpapers on Reddit
      </h1>
      {!session?.user?.id ? <RedditButton /> : <Link href="/app">Go!</Link>}
    </div>
  );
};

export default Home;
