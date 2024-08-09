import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header/Header';
import '../../Sass/App.scss';
import styles from './layout.module.scss';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <main className={styles.container}>
      <Header />
      <main className={styles.content}>{children}</main>
      <Footer />
    </main>
  );
};

export default AppLayout;
