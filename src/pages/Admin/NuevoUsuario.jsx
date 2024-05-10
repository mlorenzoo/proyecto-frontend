import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout'
import Logger from '../../library/Logger'
import useUserContext from '../../hooks/useUserContext'
import useServicesContext from '../../hooks/useServicesContext'

import { Formik } from 'formik'
import * as Yup from 'yup'

export default function NuevoUsuario() {

	const navigate = useNavigate()
	
	const { authService } = useServicesContext()

	async function onSubmit(data) {
		Logger.debug("Register form submitted")
		console.log(data)
		// Auth 
		try {
			await authService.doRegisterRole(data.name, data.surname, data.email, data.password, data.role)
			navigate("/users")
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
    role: Yup.string().notOneOf(['---'], 'Selecciona un rol').required('Selecciona un rol'),
	});

	return (
		<Layout>
			<section id="newuser" className="w-75 m-auto">
				<h2>Nuevo usuario</h2>
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
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nombre</Form.Label>
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
              <Form.Group className="mb-3" controlId="formSurname">
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
							<Form.Group className="mb-3" controlId="formEmail">
								<Form.Label>Correo electrónico</Form.Label>
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
								<Form.Label>Contraseña</Form.Label>
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
              <Form.Group className="mb-3" controlId="formRole">
                <Form.Label>Rol:</Form.Label>
                <Form.Select aria-label="Default select example" name="role" onChange={handleChange} value={values.role}>
                  <option>---</option>
                  <option value="Admin">Admin</option>
                  <option value="Gestor">Gestor</option>
                  <option value="Barbero">Barbero</option>
                  <option value="Cliente">Cliente</option>
                </Form.Select>
              </Form.Group>
              <Button variant="primary" type="submit">
                CREAR CUENTA
              </Button>
						</Form>
					)}
				</Formik>
			</section>
		</Layout>
	)
}