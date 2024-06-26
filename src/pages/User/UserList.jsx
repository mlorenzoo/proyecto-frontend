import Layout from '../../components/Layout'
import Logger from '../../library/Logger'
import useServicesContext from '../../hooks/useServicesContext'
import { useState, useEffect, useContext } from 'react'
import { Button, Form, Row, Col, Table, Modal } from 'react-bootstrap'
import { Link, useSearchParams } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

export default function UserList() {

	Logger.debug("UserList page")

	const { userService } = useServicesContext()
	const handleCloseModal = () => {
		setShowModal(false);
		setUserToDelete(null);
	};
	const [users, setUsers] = useState(null)
	const [showModal, setShowModal] = useState(false)
	const [userToDelete, setUserToDelete] = useState(null)
	const { authToken, profile, setProfile } = useContext(UserContext)
	const navigate = useNavigate()

	const [queryParams, setQueryParams] = useSearchParams();

	useEffect(() => {
		if (!authToken) {
			navigate('/unauthorized');
		}

		const fetchProfile = async () => {
			try {
				const userData = await userService.getOne(authToken)
				setProfile(userData.user)

				// Redirigir si el usuario no es Admin o Gestor
				if (userData.user.role !== 'Admin' && userData.user.role !== 'Gestor') {
					navigate('/unauthorized');
				}
			} catch (error) {
				Logger.error(error.message)
				alert("ERROR cargando perfil... :-(")
			}
		};

		const fetchUsers = async () => {
			try {
				const data = await userService.getAll()
				console.log(data);
				if (profile.role === 'Admin') {
					setUsers(data)
				} else if (profile.role === 'Gestor') {
					const filteredUsers = data.filter(user => user.role === 'Barbero');
					setUsers(filteredUsers)
				}
			} catch (error) {
				Logger.error(error.message)
				alert("ERROR cargando listado... :-(")
			}
		};

		fetchProfile().then(() => fetchUsers());
	}, [queryParams, authToken, navigate, profile.role, userService, setProfile])

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

	const handleDeleteUser = async () => {
		if (userToDelete) {
			console.log(userToDelete.id)
			try {
				await userService.doDelete(userToDelete.id);
				const updatedUsers = users.filter(user => user.id !== userToDelete.id);
				setUsers(updatedUsers);
				handleCloseModal();
				alert("Usuario eliminado con éxito!");
			} catch (error) {
				console.log(error)
				alert("ERROR al eliminar usuario");
			}
		}
	}

	return (
		<Layout>
			<section id="users" className="w-75 m-auto users">
				<h2>Usuarios</h2>
				<Form onSubmit={handleSubmit}>
					<Row>
						<Col className='buscador'>
							<Form.Group className="mb-3" controlId="formSearch">
								<Form.Control
									type="text"
									name="name"
									placeholder="Introduce el nombre del usuario/a..."
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
				{users ? (
					<>
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>ID</th>
									<th>Nombre</th>
									<th>Email</th>
									<th>Rol</th>
									<th>Editar</th>
									<th>Eliminar</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user) => (
									<tr key={user.id}>
										<td className='id'>{user.id}</td>
										<td>
											<Link to={`/users/${user.id}`}>{user.name} {user.surname}</Link>
										</td>
										<td>{user.email}</td>
										<td>{user.role}</td>
										<td>
											<Link to={`/editar/${user.id}`} role="button" aria-label="Editar">
												✏️
											</Link>
										</td>
										<td>
											<span role="img" aria-label="Eliminar" style={{ cursor: 'pointer' }} onClick={() => handleShowModal(user)}>❌</span>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
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
					</>
				) : (
					<p>Carregant llistat...</p>
				)}
			</section>
		</Layout>
	)
}
