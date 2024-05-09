import Layout from '../../components/Layout'
import Logger from '../../library/Logger'
import useServicesContext from '../../hooks/useServicesContext'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

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
						<MapContainer center={[barbershop.lat, barbershop.lon]} zoom={14} style={{ height: "400px", width: "400px" }}>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
							<Marker position={[barbershop.lat, barbershop.lon]}>
								<Popup>
									{barbershop.name}<br />
									{barbershop.ubication}
								</Popup>
							</Marker>
						</MapContainer>
					</>
				) : (
					<p>Cargando barbería...</p>
				)}
			</section>
		</Layout>
	)
}