import Layout from '../../components/Layout'
import Logger from '../../library/Logger'
import useUserContext from '../../hooks/useUserContext'
import useServicesContext from '../../hooks/useServicesContext'
import { useState, useEffect } from 'react'

export default function Profile() {

	Logger.debug("Profile page")

	const { authToken } = useUserContext()
	const { authService } = useServicesContext()

	const [ profile, setProfile ] = useState({})
	
	useEffect(() => {
		(async () => {
			// Auth 
			try {
				const data = await authService.user(authToken)
				setProfile(data)
				return data
			} catch (error) {
				Logger.error(error.message)
				alert("ERROR carregant perfil d'usuari/a... :-(")
			}
		})()
	}, [])

	return (
		<Layout>
			<section id="profile" className="w-75 m-auto">
				<h2>Perfil</h2>
				{ profile 
					? 
					<>
						<h3 className="mt-4">Nom d'usuari/a:</h3>
						<p>{profile.username}</p>
						<h3 className="mt-4">Correu electrònic:</h3>
						<p>{profile.email}</p>
					</>
					: 
					<p>Carregant perfil...</p>
				}
			</section>
		</Layout>
	)
}