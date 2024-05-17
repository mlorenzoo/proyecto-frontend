import Layout from '../../components/Layout'
import Logger from '../../library/Logger'
import useUserContext from '../../hooks/useUserContext'
import useServicesContext from '../../hooks/useServicesContext'
import { useState, useEffect } from 'react'
import { Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import defaultProfilePicture from '../../assets/default.jpg'

export default function Profile() {

    Logger.debug("Profile page")

    const { authToken } = useUserContext()
    const { userService } = useServicesContext()

    const [profile, setProfile] = useState({})

    useEffect(() => {
        (async () => {
            // Autenticación
            try {
                const data = await userService.getOne(authToken)
                console.log(data);
                setProfile(data.user)
                return data
            } catch (error) {
                Logger.error(error.message)
                alert("ERROR cargando perfil de usuario/a... :-(")
            }
        })()
    }, [authToken])
    console.log(profile.pfp);

    return (
        <Layout>
            <section id="profile" className="w-75 m-auto text-center">
                <h1>Perfil</h1>
                {profile ? 
                    <>
                        <Image 
                            roundedCircle 
                            style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: '20px' }}
                            src={profile.pfp ? `http://localhost:8000/storage/${profile.pfp}` : defaultProfilePicture} 
                            alt="Imagen de perfil" 
                            className="mb-4"
                        />
                        <div className="d-flex flex-column flex-lg-row align-items-center mt-4">
                            <div className="text-lg-start">
                                {profile.name && (
                                    <>
                                        <h2>Nombre:</h2>
                                        <p>{profile.name} {profile.surname}</p>
                                    </>
                                )}
                                {profile.email && (
                                    <>
                                        <h2>Correo electrónico:</h2>
                                        <p>{profile.email}</p>
                                    </>
                                )}
                                {profile.phone && (
                                    <>
                                        <h2>Teléfono:</h2>
                                        <p>{profile.phone}</p>
                                    </>
                                )}
                                {profile.address && (
                                    <>
                                        <h2>Dirección:</h2>
                                        <p>{profile.address}</p>
                                    </>
                                )}
                                {profile.city && (
                                    <>
                                        <h2>Ciudad:</h2>
                                        <p>{profile.city}</p>
                                    </>
                                )}
                                {profile.country && (
                                    <>
                                        <h2>País:</h2>
                                        <p>{profile.country}</p>
                                    </>
                                )}
                                {profile.role && (
                                    <>
                                        <h2>Rol:</h2>
                                        <p>{profile.role}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                : 
                    <p>Cargando perfil...</p>
                }
                {profile && (
                    <Link to={`/editar/${profile.id}`}>
                        <Button className="mb-5" variant="light">Editar Perfil</Button>
                    </Link>
                )}
            </section>
        </Layout>
    )
}
