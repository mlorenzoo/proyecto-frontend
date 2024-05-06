import Layout from '../../components/Layout'
import Logger from '../../library/Logger'
import useServicesContext from '../../hooks/useServicesContext'
import { useState, useEffect } from 'react'
import { Button, Form, Row, Col, Card, Modal } from 'react-bootstrap'
import { Link, useSearchParams } from 'react-router-dom'

export default function BarbershopList() {

  Logger.debug("BarbershopList page")

  const { bsService } = useServicesContext()

  const [users, setUsers] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)

  const [queryParams, setQueryParams] = useSearchParams();

  useEffect(() => {
    (async () => {
      try {
        const data = await bsService.getBarbershop()
        console.log(data);
        setUsers(data)
        return data
      } catch (error) {
        Logger.error(error.message)
        alert("ERROR carregant llistat... :-(")
      }
    })()
  }, [queryParams])

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let params = Object.fromEntries(formData);
    setQueryParams(params);
  }

  const handleShowModal = (user) => {
    setUserToDelete(user)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setUserToDelete(null)
  }

  const handleDeleteUser = () => {
    if (userToDelete) {
      // Perform delete operation
      handleCloseModal();
    }
  }

  return (
    <Layout>
      <section id="users" className="w-75 m-auto">
        <h2>Barberías</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formSearch">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Introduce el nombre de la barbería..."
                  defaultValue={queryParams.get('name')}
                />
              </Form.Group>
            </Col>
            <Col>
              <Button variant="primary" type="submit">
                Buscar
              </Button>
            </Col>
          </Row>
        </Form>
        <div className="card-container">
          {users ? (
            users.map((user) => (
              <div key={user.id} className="card-wrapper">
                <Card style={{ width: '18rem' }} className="card">
                  <Card.Body>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Text>
                      Dirección: <br/>{user.ubication}
                    </Card.Text>
                    <Link to={`/users/${user.id}`}>
                      <Button variant="primary">Ver detalles</Button>
                    </Link>
                    <Button variant="danger" onClick={() => handleShowModal(user)}>Eliminar</Button>
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
          <Modal.Body>¿Estás seguro que quieres eliminar el usuario?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDeleteUser}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </Layout>
  )
}
