'use client';
import { signIn, signOut, auth } from '../auth';
import { useSession } from 'next-auth/react';
import React from 'react';
import { RedditButton } from '../components/RedditButton';

const Home = () => {
  const { data: session } = useSession();
  console.log('session', session);
  return (
    <div>
      Home
      {!session && (
        <>
          Not signed in <br />
          <RedditButton />
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.name} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
};

export default Home;
