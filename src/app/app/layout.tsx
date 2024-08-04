import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="page-body">
        <div className="content">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default AppLayout;
