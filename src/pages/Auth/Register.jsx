import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout'
import Logger from '../../library/Logger'
import useServicesContext from '../../hooks/useServicesContext'

import { Formik } from 'formik';
import * as Yup from 'yup';

export default function Register() {

	const navigate = useNavigate()
	
	const { authService } = useServicesContext()

	async function onSubmit(data) {
		Logger.debug("Register form submitted")
		console.log(data)
		// Auth 
		try {
			await authService.doRegister(data.name, data.surname, data.email, data.password)
			navigate("/login")
			alert("Registre OK!")
		} catch (error) {
			Logger.error(error.message)
			alert("ERROR durant el registre... :_(")
		}
	}

	const schema = Yup.object().shape({
		name: Yup.string().required('Aquest camp és obligatori'),
		surname: Yup.string().required('Aquest camp és obligatori'),
		email: Yup.string().email('Introdueix una adreça de correu vàlida').required('Aquest camp és obligatori'),
		password: Yup.string().min(6, 'La contrasenya ha de tenir com a mínim 6 caràcters').required('Aquest camp és obligatori'),
		repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Les contrasenyes no coincideixen').required('Aquest camp és obligatori'),
		accept: Yup.boolean().oneOf([true], 'Has d\'acceptar aquesta casella').required('Aquest camp és obligatori'),
	});

	return (
		<Layout>
			<section id="register" className=" w-75 m-auto">
				<h1>Registre</h1>
				<Formik
					validationSchema={schema}
					onSubmit={onSubmit}
					initialValues={{
						name: '',
						surname: '',
						email: '',
						password: '',
						repeatPassword: '',
						accept: false,
					}}
				>
					{({ handleSubmit, handleChange, values, touched, errors }) => (
					<Form noValidate onSubmit={handleSubmit}>
						<Form.Group className="mb-4" controlId="formName">
							<Form.Label>Nom d'usuari/a</Form.Label>
							<Form.Control 
								type="text" 
								name="name" 
								placeholder="Introdueix nom d'usuari/a" 
								value={values.name}
								onChange={handleChange}
								isInvalid={!!errors.name} 
							/>
							<Form.Control.Feedback type="invalid">
								{errors.name}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group className="mb-4" controlId="formSurname">
							<Form.Label>Apellido</Form.Label>
							<Form.Control 
								type="text" 
								name="surname" 
								placeholder="Introdueix nom d'usuari/a" 
								value={values.surname}
								onChange={handleChange}
								isInvalid={!!errors.surname} 
							/>
							<Form.Control.Feedback type="invalid">
								{errors.surname}
							</Form.Control.Feedback>
						</Form.Group>
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
							<Form.Text className="text-muted">
								We'll never share your email with anyone else.
							</Form.Text>
							<Form.Control.Feedback type="invalid">
								{errors.email}
							</Form.Control.Feedback>							
						</Form.Group>
						<Form.Group className="mb-4" controlId="formPassword">
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
						<Form.Group className="mb-3" controlId="formRepeatPassword">
							<Form.Label>Repeteix contrasenya</Form.Label>
							<Form.Control 
								type="password" 
								name="repeatPassword" 
								placeholder="Introdueix password again" 
								value={values.repeatPassword}
								onChange={handleChange}
								isInvalid={!!errors.repeatPassword}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.repeatPassword}
							</Form.Control.Feedback>	
						</Form.Group>
						<Form.Group className="mb-5 check" controlId="formCheckbox">
							<Form.Check 
								type="checkbox" 
								name="accept" 
								label="Accepto la política de privacitat i els termes i condicions del lloc" 
								onChange={handleChange}
								isInvalid={!!errors.accept}
								feedback={errors.accept}
								feedbackType="invalid" 
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