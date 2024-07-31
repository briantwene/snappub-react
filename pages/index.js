import { useSession } from 'next-auth/react';
import { signIn, signOut } from '../auth';
import React from 'react';

const Home = () => {
  const { session } = useSession();
  return (
    <div>
      Home
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn('reddit')}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
};

export default Home;
