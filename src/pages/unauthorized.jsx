import React from 'react'
import Layout from '../components/Layout'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/');
  };

  return (
    <Layout>
      <div className="d-flex flex-column align-items-center mt-5">
        <h1 className="mb-4">No autorizado :(</h1>
        <p className="mb-4">Lo sentimos, no tienes permiso para acceder a esta página.</p>
        <Button variant="light" onClick={handleNavigate}>Volver a la página principal</Button>
      </div>
    </Layout>
  );
}

export default Unauthorized;
