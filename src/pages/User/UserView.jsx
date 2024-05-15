import Layout from '../../components/Layout'
import Logger from '../../library/Logger'
import useServicesContext from '../../hooks/useServicesContext'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'



export default function UserView() {

	Logger.debug("UserView page")

	const { id } = useParams();

	const { userService } = useServicesContext()

	const { authToken, profile, setProfile, user, setUser } = useContext(UserContext)

	const navigate = useNavigate()


	useEffect(() => {
		if (profile.role !== 'Admin') {
			navigate('/unauthorized');
		}
		(async () => {
			try {
				const data = await userService.getOneById(id)
				setUser(data)
				const userData = await userService.getOne(authToken)
				setProfile(userData.user)
				return data
			} catch (error) {
				Logger.error(error.message)
				alert("ERROR carregant usuari/a... :-(")
			}
		})()
	}, [id, authToken])

	useEffect(() => {
		if (!authToken) {
			navigate('/unauthorized');
		}
	}, [authToken, navigate]);

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
