import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout'
import Logger from '../../library/Logger'
import useServicesContext from '../../hooks/useServicesContext'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useContext, useEffect } from 'react'
import UserContext from '../../contexts/UserContext'

export default function NuevoUsuario() {
	const navigate = useNavigate()
	const { authService } = useServicesContext()
	const { authToken, profile } = useContext(UserContext)

	useEffect(() => {
		if (!authToken || (profile.role !== "Admin" && profile.role !== "Gestor")) {
		  navigate('/unauthorized')
		}
	}, [profile, navigate, authToken])

	async function onSubmit(data) {
		Logger.debug("Register form submitted")
		console.log(data)
		try {
			await authService.doRegisterRole(data.name, data.surname, data.email, data.password, data.role)
			navigate("/users")
			alert("Registro OK!")
		} catch (error) {
			Logger.error(error.message)
			alert("ERROR durante el registro... :_(")
		}
	}

	const schema = Yup.object().shape({
		name: Yup.string().required('Este campo es obligatorio'),
		surname: Yup.string().required('Este campo es obligatorio'),
		email: Yup.string().email('Introduce una dirección de correo válida').required('Este campo es obligatorio'),
		password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('Este campo es obligatorio'),
		repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden').required('Este campo es obligatorio'),
		role: Yup.string().notOneOf(['---'], 'Selecciona un rol').required('Selecciona un rol'),
	});

	return (
		<Layout>
			<section id="newuser" className="w-75 m-auto">
				<h2>{profile.role === "Gestor" ? "Nuevo barbero" : "Nuevo usuario"}</h2>
				<Formik
					validationSchema={schema}
					onSubmit={onSubmit}
					initialValues={{
						name: '',
						surname: '',
						email: '',
						password: '',
						repeatPassword: '',
						role: '---',
					}}
				>
					{({ handleSubmit, handleChange, values, touched, errors }) => (
						<Form noValidate onSubmit={handleSubmit}>
							<Form.Group className="mb-3" controlId="formName">
								<Form.Label>Nombre</Form.Label>
								<Form.Control 
									type="text" 
									name="name" 
									placeholder="Introduce nombre de usuario/a" 
									value={values.name}
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
									type="text" 
									name="surname" 
									placeholder="Introduce apellido de usuario/a" 
									value={values.surname}
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
									type="email"
									name="email"
									placeholder="Introduce dirección de correo"
									value={values.email}
									onChange={handleChange}
									isInvalid={!!errors.email}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.email}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formPassword">
								<Form.Label>Contraseña</Form.Label>
								<Form.Control
									type="password"
									name="password"
									placeholder="Introduce contraseña"
									value={values.password}
									onChange={handleChange}
									isInvalid={!!errors.password}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.password}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formRepeatPassword">
								<Form.Label>Repetir contraseña</Form.Label>
								<Form.Control 
									type="password" 
									name="repeatPassword" 
									placeholder="Introduce contraseña de nuevo" 
									value={values.repeatPassword}
									onChange={handleChange}
									isInvalid={!!errors.repeatPassword}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.repeatPassword}
								</Form.Control.Feedback>	
							</Form.Group>
							<Form.Group className="mb-3" controlId="formRole">
								<Form.Label>Rol:</Form.Label>
								<Form.Select aria-label="Default select example" name="role" onChange={handleChange} value={values.role}>
								{profile.role === 'Admin' ? (
										<>
											<option value="---">---</option>
											<option value="Admin">Admin</option>
											<option value="Gestor">Gestor</option>
											<option value="Barbero">Barbero</option>
											<option value="Cliente">Cliente</option>
										</>
									) : (
										<option value="Barbero">Barbero</option>
								)}
								</Form.Select>
							</Form.Group>
							<Button className='mb-5' variant="primary" type="submit">
								CREAR CUENTA
							</Button>
						</Form>
					)}
				</Formik>
			</section>
		</Layout>
	)
}
