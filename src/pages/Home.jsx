import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Layout from '../components/Layout';

function HomePage() {
  return (
    <Layout>
      <Container fluid>
        <Row className="home-page">
          <Col md={2} className="left-col">
            <section className="custom-section text">
              <h1>CORTE-Z</h1>
              <p>Cortes exclusivos, comodidad sin igual. Únete a la experiencia de suscripción</p>
              <h2>24,99€/mes</h2>
              <Button variant="secondary" className='custom-button'>SUSCRÍBETE YA</Button>{' '}
            </section>
          </Col>
          <Col md={10} className="right-col">
            <div className="custom-section">
              <img src="src/assets/shop.jpeg" alt="Imagen"/>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout> 
  );
}

export default HomePage;
