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
			const data2 = await userService.getOne(authToken)
			
			setProfile(data)
			setUser(data2.user)
			if (data2.user.role !== 'Admin' && data2.user.id !== data.id) {
				navigate("/unauthorized")
			}
			return (data, data2)
			} catch (error) {
			Logger.error(error.message)
			alert("Lolo")
			}
		})()
	}, [])
	console.log(profile, user)

	async function onSubmit(data) {
		Logger.debug("Formulario de edición enviado");
		// Auth
		try {
			const editedData = {};
			const formData = new FormData();
			
			// Agregar solo los campos modificados al objeto editedData
			if (data.name !== '' && data.name !== profile.name) {
				editedData.name = data.name;
			}
			if (data.surname !== '' && data.surname !== profile.surname) {
				editedData.surname = data.surname;
			}

			if (data.email !== '' && data.email !== profile.email) {
				editedData.email = data.email;
			}
			if (data.role !== '' && data.role !== profile.role) {
				editedData.role = data.role;
			}
			if (data.address !== '' && data.address !== profile.address) {
				editedData.address = data.address;
			}
			if (data.phone !== '' && data.phone !== profile.phone) {
				editedData.phone = data.phone;
			}
			if (data.password !== '' && data.password !== profile.password) {
				editedData.password = data.password;
			}
			if (data.pfp instanceof File) {
				formData.append('pfp', data.pfp);
			}
			console.log(data.pfp)
			console.log(formData)
			await userService.doEdit(profile.id, editedData, authToken);
			// const pfp = await userService.updateProfilePicture(profile.id, formData)
			alert("Usuario editado con éxito!");
			if (user.role === 'Admin') {
				navigate("/users");
			} else if (user.id === profile.id) {
				navigate("/profile");
			}		
		} catch (error) {
			Logger.error(error.message);
			alert("ERROR");
		}
	}
	
    const schema = Yup.object().shape({
			name: Yup.string(),
			surname: Yup.string(),
			email: Yup.string().email('Introdueix una adreça de correu vàlida'),
			role: Yup.string().notOneOf(['---'], 'Selecciona un rol'),
			address: Yup.string().nullable(),
			phone: Yup.string().matches(/^\d{9}$/, 'Introduce un número de teléfono válido de 9 dígitos').nullable(),
			password: Yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
			pfp: Yup.mixed().nullable(),
    });
  

  	return (
		<Layout>
			<section id="login" className="w-75 m-auto">
			<h2>Editar usuario "{profile.name}"</h2>
			<Formik
				validationSchema={schema}
				onSubmit={onSubmit}
				initialValues={{
						name: profile.name || '',
						surname: profile.surname || '',
						email: profile.email || '',
						role: profile.role || '',
						address: profile.address || '',
						phone: profile.phone || '',
						password: '',
						pfp: profile.pfp || '',
						remember: false,
				}}
			>
			{({ handleSubmit, handleChange, values, touched, errors }) => (        	
			<Form noValidate onSubmit={handleSubmit} enctype="multipart/form-data">
					<Form.Group className="mb-3" controlId="formName">
					<Form.Label>Nombre</Form.Label>
					<Form.Control 
    				value={values.name}
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
					value={values.surname}
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
					value={values.email}
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
		  		{user.id === profile.id && (
          		<Form.Group className="mb-3" controlId="formPassword">
					<Form.Label>Contraseña</Form.Label>

					<Form.Control 
						value={values.password}
						type="password" 
						name="password" 
						placeholder="Contraseña" 
						onChange={handleChange}
						isInvalid={!!errors.password}
					/>

					<Form.Control.Feedback type="invalid">
					{errors.password}
					</Form.Control.Feedback>
          		</Form.Group>
				)}
				<Form.Group className="mb-3" controlId="formRole">
					{user.role === "Admin" && (
					<>
					<Form.Label>Rol:</Form.Label>
					<Form.Select 
						aria-label="Default select example" 
						name="role" 
						onChange={handleChange} 
						value={values.role || profile.role} 
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
					value={values.address}
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
							type="file"
							name="pfp"
							onChange={(event) => {
									const file = event.currentTarget.files[0];
									handleChange(event);
									setFieldValue("pfp", file);
							}}
							isInvalid={!!errors.pfp}
					/>
					<Form.Control.Feedback type="invalid">
						{errors.pfp}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formPhone">
					<Form.Label>Teléfono</Form.Label>
					<Form.Control
					value={values.phone}
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