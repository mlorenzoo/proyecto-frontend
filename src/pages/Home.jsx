import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import UserContext from '../contexts/UserContext';

function HomePage() {
  const navigate = useNavigate();
  const { authToken } = useContext(UserContext);

  const handleSubscribe = () => {
    if (authToken) {
      // Si el usuario está autenticado, redirige a la página de precios
      navigate('/pricing');
    } else {
      // Si el usuario no está autenticado, redirige a la página de registro
      navigate('/register');
    }
  };

  return (
    <Layout>
      <Container fluid>
        <Row className="home-page">
          <Col md={2} className="left-col">
            <section className="custom-section text">
              <h1>CORTE-Z</h1>
              <p>Cortes exclusivos, comodidad sin igual. Únete a la experiencia de suscripción</p>
              <h2>24,99€/mes</h2>
              <Button variant="secondary" className='custom-button' onClick={handleSubscribe}>
                SUSCRÍBETE YA
              </Button>{' '}
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
