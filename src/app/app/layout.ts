import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const AppLayout = ({ children }) => {
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
