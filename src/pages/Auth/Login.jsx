import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout'
import Logger from '../../library/Logger'
import useUserContext from '../../hooks/useUserContext'
import useServicesContext from '../../hooks/useServicesContext'

import { Formik } from 'formik'
import * as Yup from 'yup'

export default function Login() {

	const navigate = useNavigate()
	const { setAuthToken, setUser, setProfile } = useUserContext()
	const { authService, lSessionService, sSessionService, userService } = useServicesContext()

	async function onSubmit(data) {
		Logger.debug("Login form submitted")
		Logger.debug(data)
		// Autenticación
		try {
			const authToken = await authService.doLogin(data.email, data.password)
			console.log(authToken);
			if (authToken) {
				const user = { "email": data.email, "remember": data.remember }
				// Perfil de usuario
				const userData = await userService.getOne(authToken)
				const profile = userData.user
				// Sesión			
				const sessionService = user.remember ? lSessionService : sSessionService
				sessionService.createSession({ authToken, user, profile })
				// Estado
				setAuthToken(authToken)
				setUser(user)
				setProfile(profile)
				// Redireccionar
				navigate("/")
			} else {
				alert("¡Credenciales incorrectas!")
			}
		} catch (error) {
			Logger.error(error.message)
			alert("ERROR durante el inicio de sesión... :-(")
		}
	}

	const schema = Yup.object().shape({
		email: Yup.string().email('Introduce una dirección de correo válida').required('Este campo es obligatorio'),
		password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('Este campo es obligatorio'),
		remember: Yup.boolean(),
	});

	return (
		<Layout>
			<section id="login" className="w-75 m-auto">
				<h1>Inicio de sesión</h1>
				<Formik
					validationSchema={schema}
					onSubmit={onSubmit}
					initialValues={{
						email: '',
						password: '',
						remember: false
					}}
				>
					{({ handleSubmit, handleChange, values, touched, errors }) => (
						<Form noValidate onSubmit={handleSubmit}>
							<Form.Group className="mb-4" controlId="formEmail">
								<Form.Label>Dirección de correo electrónico</Form.Label>
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
							<Form.Group className="mb-5 check" controlId="formCheckbox">
								<Form.Check
									type="checkbox"
									name="remember"
									label="Recordar sesión"
									onChange={handleChange}
								/>
							</Form.Group>
							<Button variant="primary" type="submit">
								Guardar
							</Button>
						</Form>
					)}
				</Formik>
			</section>
		</Layout>
	)
}
