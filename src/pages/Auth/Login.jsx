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
	const { setAuthToken, setUser } = useUserContext()
	const { authService, lSessionService, sSessionService, userService } = useServicesContext()

	async function onSubmit(data) {
		Logger.debug("Login form submitted")
		Logger.debug(data)
		// Auth 
		try {
			const authToken = await authService.doLogin(data.email, data.password)
			console.log(authToken);
			if (authToken) {
				const user = { "email": data.email, "remember": data.remember }
				// Session			
				const sessionService = user.remember ? lSessionService : sSessionService
				sessionService.createSession({ authToken, user })

				const userData = await userService.getOne(authToken);
				console.log(userData.user);

				// State
				setAuthToken(authToken)
				setUser(userData.user)
				// Redirect
				navigate("/")
				alert("Inici de sessió OK!")
			} else {
				alert("Credencials incorrectes!")
			}
		} catch (error) {
			Logger.error(error.message)
			alert("ERROR durant l'inici de sessió... :-(")
		}
	}

	const schema = Yup.object().shape({
		email: Yup.string().email('Introdueix una adreça de correu vàlida').required('Aquest camp és obligatori'),
		password: Yup.string().min(6, 'La contrasenya ha de tenir com a mínim 6 caràcters').required('Aquest camp és obligatori'),
		remember: Yup.boolean(),
	});

	return (
		<Layout>
			<section id="login" className="w-75 m-auto">
				<h1>Inici de sessió</h1>
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
								<Form.Label>Adreça electrònica</Form.Label>
								<Form.Control
									type="email"
									name="email"
									placeholder="Introdueix adreça de correu"
									value={values.email}
									onChange={handleChange}
									isInvalid={!!errors.email}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.email}
								</Form.Control.Feedback>
							</Form.Group>	
							<Form.Group className="mb-3" controlId="formPassword">
								<Form.Label>Contrasenya</Form.Label>
								<Form.Control
									type="password"
									name="password"
									placeholder="Introdueix password"
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
									label="Recordar sessió"
									onChange={handleChange}
								/>
							</Form.Group>
							<Button variant="primary" type="submit">
								Desar
							</Button>
						</Form>
					)}
				</Formik>
			</section>
		</Layout>
	)
}