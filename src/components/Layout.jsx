import React from 'react';
import { Header } from './Header';

const Layout = ({ children }) => {
    return (
        <div data-bs-theme="dark" className="layout-container">
            <Header />
            <main className="main-content"> 
                {children}
            </main>
        </div>
    );
};

export default Layout;
