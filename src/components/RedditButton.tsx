'use client';
import { signInWithReddit, signOutofReddit } from '../app/actions';

export function RedditButton() {
  return (
    <button onClick={() => signInWithReddit()}>Sign in with Reddit</button>
  );
}

export function SignOutButton() {
  return <button onClick={() => signOutofReddit()}>Sign out</button>;
}


