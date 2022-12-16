import Header from './Header';
import Footer from './Footer';

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <div className="page-body">
        <div className="content">{children}</div>
        <Footer />
      </div>
    </>
  );
}
