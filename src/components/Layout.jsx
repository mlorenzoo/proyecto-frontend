import React from 'react';
import { Header } from './Header';
import Footer from './Footer'

const Layout = ({ children }) => {
    return (
        <div data-bs-theme="dark" className="layout-container">
            <Header />
            <main className="main-content"> 
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
