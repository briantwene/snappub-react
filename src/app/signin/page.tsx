import React from 'react';
import { providerMap } from '../../auth';
import { signIn } from 'next-auth/react';
import { AuthError } from 'next-auth';
import styles from './signin.module.scss';
import { FaRedditAlien } from 'react-icons/fa';
import { signInWithReddit } from '../actions';

const SignIn = () => {
  // const router = useRouter()

  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <section className={styles.title}>
          <h1>Reddwall</h1>
          <p>Login to Reddwall</p>
        </section>

        {Object.values(providerMap).map((provider) => (
          <form key={provider.id} action={signInWithReddit}>
            <button className={styles.reddit} type="submit">
              <FaRedditAlien className={styles.icon} />
              <span>Continue with {provider.name}</span>
            </button>
          </form>
        ))}
      </section>
    </main>
  );
};

export default SignIn;
