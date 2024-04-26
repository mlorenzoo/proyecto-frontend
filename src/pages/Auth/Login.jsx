import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useUserContext from '../../hooks/useUserContext';
import Layout from '../../components/Layout';
import { useContext } from 'react';
import { ServicesContext } from '../../contexts/ServicesContext'; // Corregit el nom del fitxer d'importació
import Logger from '../../library/Logger'
import * as yup from 'yup';


export default function Login() {
	
	const {Formik} = formik;

	const [ data, setData ] = useState("")
	const navigate = useNavigate()
	const { setUser } = useUserContext()

	const schema = yup.object().shape({
		email: yup.string().required('Email requerido').email('Email debe ser uba dirección de correo electrónico'),
		password: yup.string().required('Contraseña requerida').min(6,'La contraseña debe tener mínimo 6 caracteres'),
		rememberme: yup.bool().oneOf([true], 'Remember Me'),
	});
	
	function onSubmit (e) {
		Logger.debug("Login form submitted")
		Logger.debug(data)
		setUser(data)
		navigate("/")
		e.preventDefault()
	}

	function onInput (e) {
		const formData = {}
		formData[e.currentTarget.name] = e.currentTarget.value
		setData({
			...data,
			...formData
		})
	}

	return (
		<Layout>
			<section id="login" className="w-75 m-auto">
				<h2>Sign in</h2>
				<Formik
				    initialValues={{ email: '', password: '', rememberme: false}}
					validationSchema={schema}
					onSubmit={onSubmit}
				>
					{({ isSubmitting }) => (
						<Form>
							<Form.Group className="mb-3" controlId="formEmail">
								<Form.Label>Email address</Form.Label>
								<Form.Control type="email" name="email" placeholder="Enter email" onInput={onInput} />
							</Form.Group>
							<Form.Group className="mb-3" controlId="formPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" name="password" placeholder="Enter password" onInput={onInput} />
							</Form.Group>
							<Form.Group className="mb-3" controlId="RememberMe">
								<Form.Check
									name="remember"
									label="Remember Me"
									onChange={handleChange}
								/>
							</Form.Group>
							<Button variant="primary" type="submit" disabled={isSubmitting}>
								Submit
							</Button>
						</Form>
					)}
				</Formik>
			</section>
		</Layout>
	)
}