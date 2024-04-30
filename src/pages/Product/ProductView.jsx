import Layout from '../../components/Layout'
import Logger from '../../library/Logger'
import useServicesContext from '../../hooks/useServicesContext'
import { useState, useEffect } from 'react'
import { Image } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

export default function ProductView() {

	Logger.debug("ProductView page")

	const { id } = useParams();

	const { productService } = useServicesContext()

	const [ product, setProduct ] = useState(null)
	
	useEffect(() => {
		(async () => {
			try {
				const data = await productService.getOne(id)
				setProduct(data)
				return data
			} catch (error) {
				Logger.error(error.message)
				alert("ERROR carregant producte... :-(")
			}
		})()
	}, [])

	return (
		<Layout>
			<section id="product" className="w-75 m-auto">
				{ product
					? 
					<>
						<h2>{product.title}</h2>
						<Image variant="top" src={`${process.env.IMG_URL}/products/${product.photo}`} />
						<p><b>{product.category.name}</b></p>
						<p>{product.price}</p>
						<p>{product.description}</p>
						<p>{product.created}</p>
					</>
					: 
					<p>Carregant producte...</p>
				}
			</section>
		</Layout>
	)
}