import Layout from '../../components/Layout'
import Logger from '../../library/Logger'
import useServicesContext from '../../hooks/useServicesContext'
import { useState, useEffect } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { Link, useSearchParams } from 'react-router-dom'

export default function ProductList() {

	Logger.debug("ProductList page")

	const { productService } = useServicesContext()

	const [ products, setProducts ] = useState(null)

	const [ queryParams, setQueryParams ] = useSearchParams();

	useEffect(() => {
		(async () => {
			try {
				const data = await productService.getAll(queryParams)
				setProducts(data)
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
			<section id="products" className="w-75 m-auto">
				<h2>Productes</h2>
				<Form onSubmit={handleSubmit}>
					<Row>
						<Col>
							<Form.Group className="mb-3" controlId="formSearch">
								<Form.Control
									type="text"
									name="title"
									placeholder="Introdueix títol del producte..."
									defaultValue={queryParams.get('title')}
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
				{ products 
					? 
					<Row xs={1} md={2} lg={3} className="g-4">
						{products.map((product) => (
							<Col key={product.id}>
								<Card>
									<Card.Img variant="top" src={`${process.env.IMG_URL}/products/${product.photo}`} />
									<Card.Body>
										<Card.Title><Link to={`/products/${product.id}`}>{product.title}</Link></Card.Title>
										<Card.Text>
											<p><b>{product.category.name}</b></p>
											<p>{product.price}</p>
											<p>{product.description}</p>
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