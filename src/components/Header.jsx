import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import Logger from '../library/Logger'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import useUserContext from '../hooks/useUserContext'
import useServicesContext from '../hooks/useServicesContext'

export function Header() {

	Logger.debug("Header component")
	const location = useLocation()
	const navigate = useNavigate()

	const { authToken, setAuthToken, user, setUser } = useUserContext()
	const { authService, lSessionService, sSessionService } = useServicesContext()

	async function handleLogout() {
		Logger.debug("User logout")
		// Auth
		try {
			const succes = await authService.doLogout(authToken);
			// Session
			if(succes) {
				const sessionService = user.remember ? lSessionService : sSessionService;
				sessionService.destroySession()
				// State
				setAuthToken(null)
				setUser(null)
				// Redirect
				navigate("/")
			} else {
				alert("No")
			}
		} catch (error) {
			Logger.error(error.message)
			alert("Hoia")
		}
	}

	return (
		<header>
			<Navbar collapseOnSelect expand="md" bg="primary" data-bs-theme="dark">
				<Container>
					<Navbar.Brand as={Link} to="/">React + React Bootstrap</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">						
						<Nav activeKey={location.pathname}>
							<Nav.Link as={Link} to="/products" eventKey={"/products"}>Productes</Nav.Link>
							<Nav.Link as={Link} to="/users" eventKey={"/users"}>Usuari(e)s</Nav.Link>
							{user ? (
								<>
									<Nav.Link as={Link} to="/profile">{user.email}</Nav.Link>
									<Button variant="secondary" onClick={handleLogout}>Desconnectar</Button>
								</>
							) : (
								<>
									<Nav.Link as={Link} to="/login" eventKey={"/login"}>Inici de sessió</Nav.Link>
									<Nav.Link as={Link} to="/register" eventKey={"/register"}>Registre</Nav.Link>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}
