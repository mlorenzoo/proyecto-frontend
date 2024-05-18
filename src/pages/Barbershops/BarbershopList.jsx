import Layout from '../../components/Layout'
import Logger from '../../library/Logger'
import useServicesContext from '../../hooks/useServicesContext'
import { useState, useEffect, useContext } from 'react'
import { Button, Form, Row, Col, Card, Modal } from 'react-bootstrap'
import { Link, useSearchParams } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'
import { useNavigate } from "react-router-dom";


export default function BarbershopList() {

  Logger.debug("BarbershopList page")

  const { bsService, userService } = useServicesContext()

  const [barbershops, setBarbershops] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [barbershopToDelete, setBarbershopToDelete] = useState(null)
  const { authToken, user, profile, setProfile  } = useContext(UserContext)
  const navigate = useNavigate();

  console.log(authToken)

  const [queryParams, setQueryParams] = useSearchParams();

  useEffect(() => {
    if (!authToken) {
      navigate('/unauthorized');
    }

    (async () => {
      try {
        const data = await bsService.getBarbershop()
        console.log(data);
        setBarbershops(data)

        const userData = await userService.getOne(authToken)
        console.log(userData);
        setProfile(userData.user)
        return data
      } catch (error) {
        Logger.error(error.message)
        alert("ERROR carregant llistat... :-(")
      }
    })()
  }, [queryParams])
  console.log(profile)

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let params = Object.fromEntries(formData);
    setQueryParams(params);
  }

  const handleShowModal = (barbershop) => {
    setBarbershopToDelete(barbershop)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setBarbershopToDelete(null)
  }

  const handleDeleteBarbershop = async () => {
    if (barbershopToDelete) {
      try {
        await bsService.delBarbershop(barbershopToDelete.id);
        // Actualizar la lista de barberías después de eliminar la barbería
        const updatedBarbershops = barbershops.filter(barbershop => barbershop.id !== barbershopToDelete.id);
        setBarbershops(updatedBarbershops);
        handleCloseModal();
        alert("Barbería eliminada con éxito!");
      } catch (error) {
        Logger.error(error.message);
        alert("ERROR al eliminar barbería");
      }
    }
  }

  const handleDetailsClick = async (id) => {
    try {
      await bsService.getBarbershopById(id);
      // Realizar acciones adicionales al obtener los detalles de la barbería, si es necesario
    } catch (error) {
      Logger.error(error.message);
      alert("ERROR al obtener detalles de la barbería");
    }
  }

  return (
    <Layout>
      <section id="barbershops" className="w-75 m-auto">
        <h2>Barberías</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-3 buscador" controlId="formSearch">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Introduce el nombre de la barbería..."
                  defaultValue={queryParams.get('name')}
                />
              </Form.Group>
            </Col>
            <Col className='botones'>
              <Button variant="primary" type="submit">
                Buscar
              </Button>
              {profile && profile.role === "Gestor" && (
                <Link to="/new-barbershop">
                  <Button variant="success">
                    Añadir barbería
                  </Button>
                </Link>
              )}
            </Col>
          </Row>
        </Form>
        <div className="card-container">
          {barbershops ? (
            barbershops.map((barbershop) => (
              <div key={barbershop.id} className="card-wrapper">
                <Card style={{ width: '18rem' }} className="card">
                  <Card.Body>
                    <Card.Title>{barbershop.name}</Card.Title>
                    <Card.Text>
                      Dirección: <br/>{barbershop.ubication}
                    </Card.Text>
                    <Link to={`/barbershops/${barbershop.id}`}>
                      <Button variant="primary" onClick={() => handleDetailsClick(barbershop.id)}>Ver detalles</Button>
                    </Link>
                    {profile && profile.role === "Gestor" && profile.id === barbershop.gestor_id && (
                    <Button variant="danger" onClick={() => handleShowModal(barbershop)}>Eliminar</Button>
                    )}
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <p>Carregant llistat...</p>
          )}
        </div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Estás seguro que quieres eliminar la barbería?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
              <Button variant="danger" onClick={handleDeleteBarbershop}>
                Eliminar
              </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </Layout>
  )
}
