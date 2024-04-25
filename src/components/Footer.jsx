import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

export function Footer() {
    return (
        <footer>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Text>
                        &copy; {new Date().getFullYear()} Mi Sitio Web
                    </Navbar.Text>
                </Container>
            </Navbar>
        </footer>
    );
}