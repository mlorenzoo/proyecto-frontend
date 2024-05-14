import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className='bg-primary'>
      <Container className='footer'>
      <Row className="justify-content-between">
          <Col md={6} className="d-flex flex-column align-items-start">
            <p>© 2024 CORTE-Z</p>
            <ul className="list-unstyled d-flex">
              <li className="me-3"><a href="/">Inicio</a></li>
              <li><a href="/contacto">Contacto</a></li>
            </ul>
          </Col>
          <Col md={6} className="d-flex flex-column align-items-end">
            <p>Segueix-nos a les xaxes!</p>
            <div className="d-flex">
              <a href="https://twitter.com" className="me-2"><FaTwitter size={24} /></a>
              <a href="https://github.com" className="me-2"><FaGithub size={24} /></a>
              <a href="https://linkedin.com" className="me-2"><FaLinkedin size={24} /></a>
              <a href="https://instagram.com"><FaInstagram size={24} /></a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
