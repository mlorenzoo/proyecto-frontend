import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Layout from '../components/Layout';

function HomePage() {
  return (
    <Layout>
      <Container>
        <Row className="fila">
          <Col md={3} style={{ height: '100%',  marginTop: '300px' }}> {/* Aplicando altura del 100% a la columna */}
            <section className="text-center" style={{ height: '100%' }}> {/* Aplicando altura del 100% al section */}
              <h1>CORTE-Z</h1>
              <p>Cortes exclusivos, comodidad sin igual. Únete a la experiencia de suscripción</p>
              <h3>24,99€/mes</h3>
              <Button variant="secondary" className='custom-button'>SUSCRÍBETE YA</Button>{' '}
            </section>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default HomePage;
