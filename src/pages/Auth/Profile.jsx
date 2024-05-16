import Layout from '../../components/Layout'
import Logger from '../../library/Logger'
import useUserContext from '../../hooks/useUserContext'
import useServicesContext from '../../hooks/useServicesContext'
import { useState, useEffect } from 'react'
import { Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Profile() {

    Logger.debug("Profile page")

    const { authToken } = useUserContext()
    const { authService, userService } = useServicesContext()

    const [profile, setProfile] = useState({})

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
                alert("ERROR carregant perfil d'usuari/a... :-(")
            }
        })()
    }, [])
    console.log(profile.pfp);

    return (
        <Layout>
            <section id="profile" className="w-75 m-auto text-center">
                <h1>Perfil</h1>
                {profile 
                    ? 
                    <div className="d-flex flex-column flex-lg-row align-items-center mt-4">
                        <Image 
                            roundedCircle 
                            style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: '20px' }}
                            src={`http://localhost:8000/storage/${profile.pfp}`} 
                            alt="Imagen de perfil" 
                            className="me-lg-4 mb-4 mb-lg-0"
                        />
                        <div className="text-lg-start">
                            <h2>Nombre:</h2>
                            <p>{profile.name} {profile.surname}</p>
                            <h2>Correo electónico:</h2>
                            <p>{profile.email}</p>
                        </div>
                    </div>
                    : 
                    <p>Carregant perfil...</p>
                }
                {profile && (
                    <Link to={`/editar/${profile.id}`}>
                        <Button variant="light">Editar Perfil</Button>
                    </Link>
                )}
            </section>
        </Layout>
    )
}
