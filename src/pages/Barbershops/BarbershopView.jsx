import Layout from '../../components/Layout'
import Logger from '../../library/Logger'
import useServicesContext from '../../hooks/useServicesContext'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function BarbershopView() {

	Logger.debug("BarbershopView page")

	const { id } = useParams();

	const { bsService } = useServicesContext()

	const [barbershop, setBarbershop] = useState(null)

	useEffect(() => {
		(async () => {
			try {
				const data = await bsService.getBarbershopById(id)
				setBarbershop(data)
				return data
			} catch (error) {
				Logger.error(error.message)
				alert("ERROR cargando barbería... :-(")
			}
		})()
	}, [id])

	return (
		<Layout>
			<section id="barbershop" className="w-75 m-auto">
				{barbershop ? (
					<>
						<h2>{barbershop.name}</h2>
						<br />
						<h3>Dirección</h3>
						<p>{barbershop.ubication}</p>
						{/* Aquí puedes agregar más detalles sobre la barbería si es necesario */}
					</>
				) : (
					<p>Cargando barbería...</p>
				)}
			</section>
		</Layout>
	)
}