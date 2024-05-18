import Layout from '../../components/Layout'
import Logger from '../../library/Logger'
import useServicesContext from '../../hooks/useServicesContext'
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'

export default function UserView() {

	Logger.debug("UserView page")

	const { id } = useParams()
	const { userService } = useServicesContext()
	const { authToken, profile, setProfile, user, setUser } = useContext(UserContext)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const data = await userService.getOneById(id)
				setUser(data)

				const userData = await userService.getOne(authToken)
				setProfile(userData.user)
				
				// Redirigir si el usuario no es Admin y el perfil no es Barbero
				if (profile.role !== 'Admin' && !(profile.role === 'Gestor' && data.role === 'Barbero')) {
					navigate('/unauthorized')
				}
			} catch (error) {
				Logger.error(error.message)
				alert("ERROR carregant usuari/a... :-(")
			}
		}

		if (authToken) {
			fetchUser()
		} else {
			navigate('/unauthorized')
		}
	}, [id, authToken, navigate, profile.role, setProfile, userService])

	useEffect(() => {
		if (!authToken) {
			navigate('/unauthorized')
		}
	}, [authToken, navigate])

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
