import Layout from '../../components/Layout'
import Logger from '../../library/Logger'
import useServicesContext from '../../hooks/useServicesContext'
import { useState, useEffect } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { Link, useSearchParams } from 'react-router-dom'

export default function UserList() {

	Logger.debug("UserList page")

	const { userService } = useServicesContext()

	const [ users, setUsers ] = useState(null)

	const [ queryParams, setQueryParams ] = useSearchParams();

	useEffect(() => {
		(async () => {
			try {
				const data = await userService.getAll(queryParams)
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

	return (
		<Layout>
			<section id="users" className="w-75 m-auto">
				<h2>Usuari(e)s</h2>
				<Form onSubmit={handleSubmit}>
					<Row>
						<Col>
							<Form.Group className="mb-3" controlId="formSearch">
								<Form.Control
									type="text"
									name="name"
									placeholder="Introdueix nom de l'usuari/a..."
									defaultValue={queryParams.get('name')}
								/>
							</Form.Group>
						</Col>
						<Col>
							<Button variant="primary" type="submit">
								Cercar
							</Button>
						</Col>
					</Row>
				</Form>
				{ users 
					? 
					<Row xs={1} md={2} lg={3} className="g-4">
						{users.map((user) => (
							<Col key={user.id}>
								<Card>
									<Card.Body>
										<Card.Title>
											<Link to={`/users/${user.id}`}>{user.name}</Link>
										</Card.Title>
										<Card.Text>
											<p>{user.email}</p>
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
					: 
					<p>Carregant llistat...</p>
				}
			</section>
		</Layout>
	)
}