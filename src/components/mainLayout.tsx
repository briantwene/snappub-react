import Header from './Header/Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
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
