import React, { useContext } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import Logger from '../library/Logger';
import { useLocation, useNavigate } from 'react-router-dom';
//import { ServicesContext } from '../contexts/ServicesContext';

export function Header() {
    Logger.debug("Header component");

    const location = useLocation();
    const navigate = useNavigate();
    const { services, setAuthToken, setUser } = useContext(ServicesContext);
    const { authservice } = services;

    const isAuthenticated = authservice.isAuthenticated();
    const user = authservice.getUser();

    const handleLogout = (e) => {
        Logger.debug("User logout");
        
        // Auth 
        const success = authservice.logout();
        
        if (success) {
            // Session
            // if (sessionService) {
            //     sessionService.destroySession();
            // }
            
            // State
            setAuthToken(null);
            setUser(null);

            // Redirect
            navigate("/");
        } else {
            alert("Logout error... :-O");
        }

        e.preventDefault();
    };

    return (
        <header>
            <Navbar collapseOnSelect expand="md" bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">React + React Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">						
                        <Nav activeKey={location.pathname}>
                            <Nav.Link href="/" eventKey={"/"}>Home</Nav.Link>
                            {/* 
                                <Nav.Link href="/profile" eventKey={"/profile"}>Profile</Nav.Link>
                                <Nav.Link href="/products" eventKey={"/barberos"}>Barberos</Nav.Link>
                                <Nav.Link href="/users" eventKey={"/users"}>Users</Nav.Link>
                            */}
                            {isAuthenticated ? (
                                <>
                                    <Nav.Link>{user.email}</Nav.Link>
                                    <Button variant="secondary" onClick={handleLogout}>Desconnectar</Button>
                                </>
                            ) : (
                                <>
                                    <Nav.Link href="/login" eventKey={"/login"}>Login</Nav.Link>
                                    <Nav.Link href="/register" eventKey={"/register"}>Register</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
