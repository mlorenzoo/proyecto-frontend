import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import Logger from '../library/Logger'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import useUserContext from '../hooks/useUserContext'
import useServicesContext from '../hooks/useServicesContext'
import { useState, useEffect } from 'react'
import { Image } from 'react-bootstrap'

export function Header() {

  Logger.debug("Header component")
  const location = useLocation()
  const navigate = useNavigate()
  const [profile, setProfile] = useState({})
  const { authToken, setAuthToken, user, setUser } = useUserContext()
  const { authService, userService, lSessionService, sSessionService } = useServicesContext()

  async function handleLogout() {
    Logger.debug("User logout")
    // Auth
    try {
      const success = await authService.doLogout(authToken);
      // Session
      if (success) {
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

  useEffect(() => {
    (async () => {
      // Auth 
      try {
        const data = await userService.getOne(authToken)
        console.log(data);
        setProfile(data.user)
        return data
      } catch (error) {
        Logger.error(error.message)
      }
    })()
  }, [])
  console.log(profile)

  return (
    <header>
      <Navbar collapseOnSelect expand="md" bg="primary" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="custom-navbar-brand">CORTE-Z</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav activeKey={location.pathname}>
              {user ? (
                <>
                  {profile.role === "Admin" && (
                    <>
                      <Nav.Link as={Link} to="/nuevo-usuario" eventKey={"/products"}>NUEVO USUARIO</Nav.Link>
                      <Nav.Link as={Link} to="/users" eventKey={"/users"}>LISTA USUARIOS</Nav.Link>
                      <Nav.Link as={Link} to="/subscriptions" eventKey={"/subscriptions"}>SUBSCRIPTIONS</Nav.Link>
                      <Nav.Link as={Link} to="/profile">{profile.name} {profile.role}</Nav.Link>
                    </>
                  )}

                  {profile.role === "Gestor" && (
                    <>
                      <Nav.Link as={Link} to="/barbershops" eventKey={"/barbershops"}>BARBERÍAS</Nav.Link>
                      <Nav.Link as={Link} to="/users" eventKey={"/users"}>Gestor</Nav.Link>
                      <Nav.Link as={Link} to="/profile">{profile.role}</Nav.Link>
                    </>
                  )}

                  {profile.role === "Barbero" && (
                    <>
                      <Nav.Link as={Link} to="/barbershops" eventKey={"/barbershops"}>BARBERÍAS</Nav.Link>
                      <Nav.Link as={Link} to="/profile">{profile.role}</Nav.Link>
                    </>
                  )}

                  {profile.role === "Cliente" && (
                    <>
                      <Nav.Link as={Link} to="/pricing" eventKey={"/PLANES"}>PLANES</Nav.Link>
                      <Nav.Link as={Link} to="/barbershops" eventKey={"/barbershops"}>BARBERÍAS</Nav.Link>
                      <Nav.Link as={Link} to="/profile">PERFIL</Nav.Link>
                    </>
                  )}

                  {/* Ocultar imagen en dispositivos pequeños */}
                  <div className="d-none d-md-block">
                    {profile.pfp && (
                      <Image
                        src={`http://localhost:8000/storage/${profile.pfp}`}
                        roundedCircle
                        style={{ width: '40px', height: '40px', marginRight: '10px' }}
                      />
                    )}
                  </div>

                  <Button variant="danger" onClick={handleLogout}>Desconnectar</Button>
                </>
              ) : (
                  <>
                    <Button as={Link} to="/login" variant="primary" className='custom-button'>
                      INICIAR SESIÓN
                    </Button>
                    <Button as={Link} to="/register" variant="secondary" className='custom-button'>
                      ÚNETE YA
                    </Button>
                  </>
                )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
