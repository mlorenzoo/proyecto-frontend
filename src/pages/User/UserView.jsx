import Layout from '../../components/Layout'
import Logger from '../../library/Logger'
import useServicesContext from '../../hooks/useServicesContext'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function UserView() {

	Logger.debug("UserView page")

	const { id } = useParams();

	const { userService } = useServicesContext()

	const [user, setUser] = useState(null)

	useEffect(() => {
		(async () => {
			try {
				const data = await userService.getOneById(id)
				setUser(data)
				return data
			} catch (error) {
				Logger.error(error.message)
				alert("ERROR carregant usuari/a... :-(")
			}
		})()
	}, [id])

	return (
		<Layout>
			<section id="user" className="w-75 m-auto">
				{user ? (
					<>
						<h2>{user.name} {user.surname}</h2>
						<br />
						<h3>Email</h3>
						<p>{user.email}</p>
						<h3>Rol</h3>
						<p>{user.role}</p>
						{/* Aquí puedes agregar más detalles sobre el usuario si es necesario */}
					</>
				) : (
					<p>Carregant usuari/a...</p>
				)}
			</section>
		</Layout>
	)
}
