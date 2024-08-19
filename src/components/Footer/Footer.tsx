// #Filename: Footer.jsx
// #Author: Brian Twene (@bt521)
// #Date:12/12/21
import React from 'react';
import { SiGithub } from 'react-icons/si';
import styles from './Footer.module.scss';
import { RedwallLogo } from '../Icon';

function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.footerNav}>
        <section className={styles.social}>
          <a
            href="https://github.com/briantwene/snappub-react"
            className={styles.footerLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiGithub />
          </a>
        </section>
        <section>
          <a href="/" className={styles.footerLink}>
            <RedwallLogo className={styles.logo} />
          </a>
        </section>
        <section>Reddwall &copy; {new Date().getFullYear()}</section>
      </nav>
    </footer>
  );
}

export default Footer;
