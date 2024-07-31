'use server';
import { signIn, signOut } from '../auth';

export async function signInWithReddit() {
  return await signIn('reddit', { redirectTo: '/app' });
}

export async function signOutofReddit() {
  return await signOut({ redirectTo: '/' });
}
