'use client';
import { signInWithReddit } from '../app/actions';
import { signIn } from '../auth';

export function RedditButton() {
  return (
    <button onClick={() => signInWithReddit()}>Sign in with Reddit</button>
  );
}
