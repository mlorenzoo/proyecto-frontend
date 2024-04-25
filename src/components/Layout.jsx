import { Footer } from './Footer';
import { Header } from './Header';
import { Container } from 'react-bootstrap';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Header />
      <main className="p-5 flex-grow-1">
        <Container>{children}</Container>
      </main>
      <Footer className="footer" />
    </div>
  );
};

export default Layout;