import React, { useState, useEffect, useContext } from "react";
import { Button, Table, Modal } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Logger from '../../library/Logger';
import useServicesContext from '../../hooks/useServicesContext';
import { Link } from 'react-router-dom';
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const ListSubscriptions = () => {
  const { subsService } = useServicesContext();
  const [subscriptions, setSubscriptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState(null);
  const { user, profile } = useContext(UserContext);
  const navigate = useNavigate();


  useEffect(() => {
    if (!profile || profile.role !== "Admin") {
      navigate('/unauthorized');
    }

    (async () => {
      try {
        const data = await subsService.getSubs();
        setSubscriptions(data);
        console.log(data);
      } catch (error) {
        Logger.error(error.message);
      }
    })();
  }, []);
  console.log(user)

  const handleSubscriptionSelect = (subscription) => {
    // Handle subscription selection logic here
    console.log("Selected subscription:", subscription);
  };

  const handleShowModal = (subscription) => {
    setSubscriptionToDelete(subscription.id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSubscriptionToDelete(null);
  };

  async function handleDeleteSubscription() {
    Logger.debug("User logout");
    try {
        await subsService.delSubs(subscriptionToDelete);
        handleCloseModal();
        window.location.reload();
    } catch (error) {
        Logger.error(error.message);
    }
  }

  return (
    <Layout>
      <section id="subscriptions" className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h1>Elige tu experiencia de CORTE-Z</h1>
            <p>Cortes exclusivos, comodidad sin igual. Únete a la experiencia de suscripción</p>
          </div>
        </div>
        <div className="row justify-content-between mt-3">
          <div className="col-md-4">
            <h2>Planes</h2>
          </div>
          <div className="col-md-4 text-end">
            <Link to="/new-plan">
              <Button variant="primary" className="plan">Nuevo plan</Button>
            </Link>
          </div>
        </div>
        <div className="row justify-content-center">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Plan</th>
                <th>Precio</th>
                <th>Duración</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map(subscription => (
                <tr key={subscription.id}>
                  <td className="id">{subscription.id}</td>
                  <td>{subscription.plan}</td>
                  <td>{`€${subscription.price}`}</td>
                  <td>{subscription.duration}</td>
                  <td>{subscription.description}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleSubscriptionSelect(subscription)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleShowModal(subscription)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro que quieres eliminar la suscripción?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteSubscription}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default ListSubscriptions;
