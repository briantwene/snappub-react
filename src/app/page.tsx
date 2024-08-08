import { auth } from '../auth';
import React from 'react';
import Link from 'next/link';
import styles from './index.module.scss';
import { RedwallLogo } from '../components/icon';

const Home = async () => {
  const session = await auth();
  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <div className={styles.logo}>
              <RedwallLogo />
            </div>
            <div>
              {!session?.user?.id ? (
                <Link href="/signin">Sign In</Link>
              ) : (
                <Link href="/auth/signout">Sign Out</Link>
              )}
            </div>
          </nav>
        </header>
        <main className={styles.hero}>
          <h1>Your Gateway to Beautiful Wallpapers on Reddit</h1>
          <p>
            Discover and download stunning wallpapers curated from Reddit.
            Enhance your desktop or mobile experience with beautiful images.
          </p>
          {!session?.user?.id ? (
            <Link href="/signin">Get Started</Link>
          ) : (
            <Link href="/app">Go Go Go!</Link>
          )}
        </main>
      </section>
    </main>
  );
};

export default Home;
