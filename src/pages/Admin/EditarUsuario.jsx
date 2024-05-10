import { Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../../components/Layout'
import Logger from '../../library/Logger'
import useUserContext from '../../hooks/useUserContext'
import useServicesContext from '../../hooks/useServicesContext'

import { Formik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'

export default function EditarUsuario() {
	const { id } = useParams();
	const navigate = useNavigate()
	
	const { authService, userService } = useServicesContext()
  const [ profile, setProfile ] = useState({})
	const [ user, setUser ] = useState({})
	const { authToken, setAuthToken } = useUserContext()



	useEffect(() => {
		(async () => {
			// Auth 
			try {
				const data = await userService.getOneById(id)
				console.log(data)
				console.log(authToken)
				const data2 = await userService.getOne(authToken)
				setProfile(data)
				setUser(data2.user)
				return (data, data2)
			} catch (error) {
				Logger.error(error.message)
				alert("Lolo")
			}
		})()
	}, [])
	console.log(profile, user)

	async function onSubmit(data) {
		Logger.debug("Register form submitted")
		console.log(data)
		// Auth 
		try {
      	console.log(data.name);
		await userService.doEdit(profile.id, data.name, data.surname, data.email, data.role)
		alert("Usuario editado con éxito!")
		navigate("/users")
		} catch (error) {
			Logger.error(error.message)
			alert("ERROR(")
		}
	}

	const schema = Yup.object().shape({
		name: Yup.string().required('Aquest camp és obligatori'),
		surname: Yup.string().required('Aquest camp és obligatori'),
		email: Yup.string().email('Introdueix una adreça de correu vàlida').required('Aquest camp és obligatori'),
		role: Yup.string().notOneOf(['---'], 'Selecciona un rol').required('Selecciona un rol'),
		pfp: Yup.mixed().required('Es necesario subir una imagen').test(
		  'fileFormat',
		  'Sólo se admiten archivos de imagen (jpeg, jpg, png, gif)',
		  value => value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)
		),
		address: Yup.string().nullable(),
		phone: Yup.string().matches(/^[0-9]{10}$/, 'Introduce un número de teléfono válido').nullable(),
		password: Yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('Este campo es obligatorio'),
		});
	

	return (
		<Layout>
			<section id="login" className="w-75 m-auto">
				<h2>Editar usuario "{profile.name}"</h2>
				<Formik
					validationSchema={schema}
					onSubmit={onSubmit}
					initialValues={{
					name: profile.name,
					surname: profile.surname,
					email: profile.email,
					role: profile.role,
					pfp: profile.pfp || '',
					address: profile.address || '',
					phone: profile.phone || '',
					password: '',
					remember: false,
				}}
				>
				{({ handleSubmit, handleChange, values, touched, errors }) => (
				<Form noValidate onSubmit={handleSubmit}>
              		<Form.Group className="mb-3" controlId="formName">
						<Form.Label>Nombre</Form.Label>
						<Form.Control 
						defaultValue={profile.name}
						type="text" 
						name="name" 
						placeholder="Introduce nombre de usuario/a" 
						onChange={handleChange}
						isInvalid={!!errors.name} 
						/>
						<Form.Control.Feedback type="invalid">
						{errors.name}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formSurname">
						<Form.Label>Apellido</Form.Label>
						<Form.Control 
						defaultValue={profile.surname}
						type="text" 
						name="surname" 
						placeholder="Introduce apellido" 
						onChange={handleChange}
						isInvalid={!!errors.surname} 
						/>
						<Form.Control.Feedback type="invalid">
						{errors.surname}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formEmail">
						<Form.Label>Correo electrónico</Form.Label>
						<Form.Control
                  		defaultValue={profile.email}
						type="email"
						name="email"
						placeholder="Introduce correo electrónico"
						onChange={handleChange}
						isInvalid={!!errors.email}
						/>
						<Form.Control.Feedback type="invalid">
						{errors.email}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formPassword">
						<Form.Label>Contraseña</Form.Label>
						{user.id === profile.id && ( // Mostrar el campo solo si la ID de la sesión es la misma que la ID del usuario que se está editando
							<Form.Control 
								defaultValue={profile.password}
								type="password" 
								name="password" 
								placeholder="Contraseña" 
								onChange={handleChange}
								isInvalid={!!errors.password} 
							/>
						)}
						<Form.Control.Feedback type="invalid">
							{errors.password}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formRole">
						{profile.role === "Admin" && ( // Mostrar el campo solo si el rol es Admin
							<>
							<Form.Label>Rol:</Form.Label>
							<Form.Select 
								aria-label="Default select example" 
								name="role" 
								onChange={handleChange} 
								value={values.role} 
								defaultValue={profile.role}
							>
								<option>---</option>
								<option value="Admin">Admin</option>
								<option value="Gestor">Gestor</option>
								<option value="Barbero">Barbero</option>
								<option value="Cliente">Cliente</option>
							</Form.Select>
							</>
						)}
					</Form.Group>
					<Form.Group className="mb-3" controlId="formAddress">
						<Form.Label>Dirección</Form.Label>
						<Form.Control
                  		defaultValue={profile.address}
						type="text"
						name="address"
						placeholder="Introduce tu durección"
						onChange={handleChange}
						isInvalid={!!errors.address}
						/>
						<Form.Control.Feedback type="invalid">
						{errors.address}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formPFP">
						<Form.Label>Foto de perfil</Form.Label>
						<Form.Control
                  		defaultValue={profile.pfp}
						type="file"
						name="pfp"
						placeholder="Introduce tu foto de perfil"
						onChange={handleChange}
						isInvalid={!!errors.pfp}
						/>
						<Form.Control.Feedback type="invalid">
						{errors.phone}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formPhone">
						<Form.Label>Dirección</Form.Label>
						<Form.Control
                  		defaultValue={profile.phone}
						type="text"
						name="phone"
						placeholder="Introduce tu número de teléfono"
						onChange={handleChange}
						isInvalid={!!errors.phone}
						/>
						<Form.Control.Feedback type="invalid">
						{errors.phone}
						</Form.Control.Feedback>
					</Form.Group>
					<Button variant="primary" type="submit">
						EDITAR USUARIO
					</Button>
				</Form>
				)}
				</Formik>
			</section>
		</Layout>
	)
}
