import Layout from '../../components/Layout'
import Logger from '../../library/Logger'
import useUserContext from '../../hooks/useUserContext'
import useServicesContext from '../../hooks/useServicesContext'
import { useState, useEffect } from 'react'

export default function Profile() {

    Logger.debug("Profile page")

    const { authToken } = useUserContext()
    const { authService, userService } = useServicesContext()

    const [profile, setProfile] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            // Auth 
            try {
                const data = await userService.getOne(authToken)
                console.log(data)
                setProfile(data.user)
                setIsLoading(false)
                return data
            } catch (error) {
                Logger.error(error.message)
                alert("ERROR carregant perfil d'usuari/a... :-(")
                setIsLoading(false)
            }
        })()
    }, [authToken, userService])

    return (
        <Layout>
            <section id="profile" className="w-75 m-auto">
                <h1>Perfil</h1>
                {isLoading ? (
                    <p>Carregant perfil...</p>
                ) : (
                    profile && (
                        <>
                            {profile.name && profile.surname && (
                                <>
                                    <h2 className="mt-4">Nombre:</h2>
                                    <p>{profile.name} {profile.surname}</p>
                                </>
                            )}
                            {profile.email && (
                                <>
                                    <h2 className="mt-4">Correo electónico:</h2>
                                    <p>{profile.email}</p>
                                </>
                            )}
                            {profile.pfp && (
                                <>
                                    <h2 className="mt-4">Imatge de perfil:</h2>
                                    <p><img style={{ maxWidth: '200px', maxHeight: '200px' }} src={`http://localhost:8000/storage/${profile.pfp}`} alt="Imatge de perfil" /></p>
                                </>
                            )}
                            {profile.address && (
                                <>
                                    <h2 className="mt-4">Dirección:</h2>
                                    <p>{profile.address}</p>
                                </>
                            )}
                            {profile.phone && (
                                <>
                                    <h2 className="mt-4">Teléfono:</h2>
                                    <p>{profile.phone}</p>
                                </>
                            )}
                            {profile.role && (
                                <>
                                    <h2 className="mt-4">Rol:</h2>
                                    <p>{profile.role}</p>
                                </>
                            )}
                        </>
                    )
                )}
            </section>
        </Layout>
    )
}
