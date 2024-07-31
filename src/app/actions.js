'use server';
import { signIn } from '../auth';

export async function signInWithReddit() {
  return await signIn();
}
