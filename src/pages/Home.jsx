import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Layout from '../components/Layout'; // Importar el componente Layout

function HomePage() {
  return (
    <Layout>
      <Container>
        <Row>
          {/* Columna para el texto */}
          <Col md={6}>
            <section className="text-center text-md-start"> {/* Agregando la clase text-md-start */}
              <h1>CORTE-Z</h1>
              <p>Cortes exclusivos, comodidad sin igual. Únete a la experiencia de suscripción</p>
              <h3>24,99€/mes</h3>
              <Button variant="secondary" className='custom-button'>SUSCRÍBETE YA</Button>{' '}
            </section>
          </Col>
          {/* Columna para la imagen (vacía en este ejemplo) */}
          <Col md={6}>
            <div>
              {/* Aquí podrías incluir tu imagen */}
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default HomePage;
