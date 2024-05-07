import Layout from '../../components/Layout'
import Logger from '../../library/Logger'
import useUserContext from '../../hooks/useUserContext'
import useServicesContext from '../../hooks/useServicesContext'
import { useState, useEffect } from 'react'

export default function Profile() {

    Logger.debug("Profile page")

    const { authToken } = useUserContext()
    const { authService, userService } = useServicesContext()

    const [ profile, setProfile ] = useState({})

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

    return (
        <Layout>
            <section id="profile" className="w-75 m-auto">
                <h1>Perfil</h1>
                { profile 
                    ? 
                    <>
                        <h2 className="mt-4">Nombre:</h2>
                        <p>{profile.name} {profile.surname}</p>
                        <h2 className="mt-4">Correo electónico:</h2>
                        <p>{profile.email}</p>
                        <h2 className="mt-4">Imatge de perfil:</h2>
                        {profile.pfp && <img src={profile.pfp} alt="Imatge de perfil" />}
                    </>
                    : 
                    <p>Carregant perfil...</p>
                }
            </section>
        </Layout>
    )
}
