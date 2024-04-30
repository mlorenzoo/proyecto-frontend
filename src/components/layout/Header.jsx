import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../userContext';
import { URL_API } from '../../constants';
import { setUsuari, setAuthToken, setError } from '../../slices/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { set } from 'react-hook-form';
import { doLogout } from '../../slices/auth/thunks';

export const Header = () => {
    const { usuari, authToken } = useSelector (state => state.auth)
    const dispatch = useDispatch()
    let [roles, setRoles] = useState([]);

    useEffect(() => {
        dispatch(setAuthToken(authToken)); // Esta línea ahora se mueve aquí
    }, [authToken, dispatch]); // Se debe especificar dispatch como una dependencia de useEffect

    useEffect(() => {
        console.log(authToken)
        const fetchUserInformation = async () => {
            try {
                const response = await fetch(URL_API + "user", {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                    method: "GET",
                });
                const data = await response.json(); // Analizar la respuesta JSON aquí, no en 'data'
                console.log('res', data); // Verifica los datos recibidos
                if (!response.ok) {
                    throw new Error(`Error al obtener usuario: ${response.status}`);
                } else {
                    dispatch(setUsuari(data.user.name));
                    setRoles(data.roles);
                }
            } catch (error) {
                console.error("Error en fetchUserInformation:", error);
                // alert("Catchch");
            }
        };
        fetchUserInformation();
    }, [authToken, dispatch]);

    const logout = () => {
        dispatch(doLogout());
    }

    return (
        <>
            <nav className="bg-indigo-400 px-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-white text-xs">GEOMIR</div>
                        <div className="pl-9 ">
                            <Link to="/places">Places </Link>
                            <Link to="/posts">Posts </Link>
                            <Link to="/about">About </Link>
                        </div>
                    </div>
                    <div>
                        {usuari} (
                        {roles.map ((v) => (
                            <span key={v}>{v}</span>
                        ))})
                        <button className="text-orange-800" onClick={logout}>Logout</button>
                    </div>
                </div>
            </nav>
        </>
    );
};
