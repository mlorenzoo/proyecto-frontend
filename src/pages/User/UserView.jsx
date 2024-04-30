import Layout from '../../components/Layout'
import Logger from '../../library/Logger'
import useServicesContext from '../../hooks/useServicesContext'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function UserView() {

	Logger.debug("UserView page")

	const { id } = useParams();

	const { userService } = useServicesContext()

	const [ user, setUser ] = useState(null)
	
	useEffect(() => {
		(async () => {
			try {
				const data = await userService.getOne(id)
				setUser(data)
				return data
			} catch (error) {
				Logger.error(error.message)
				alert("ERROR carregant usuari/a... :-(")
			}
		})()
	}, [])

	return (
		<Layout>
			<section id="user" className="w-75 m-auto">
				{ user
					? 
					<>
						<h2>{user.name}</h2>
						<p>{user.email}</p>
						<p>{user.created}</p>
					</>
					: 
					<p>Carregant usuari/a...</p>
				}
			</section>
		</Layout>
	)
}