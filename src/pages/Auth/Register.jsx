import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout'
import Logger from '../../library/Logger'
import useUserContext from '../../hooks/useUserContext'

export default function Login() {
	
	const [ data, setData ] = useState("")
	const navigate = useNavigate()
	const { setUser } = useUserContext()
	
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
				<Form onSubmit={onSubmit}>
					<Form.Group className="mb-3" controlId="formEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" name="email" placeholder="Enter email" onInput={onInput} />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" name="password" placeholder="Enter password" onInput={onInput} />
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</section>
		</Layout>
	)
}