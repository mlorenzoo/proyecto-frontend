import React, { useContext } from 'react'
import { useState } from 'react';
import { UserContext } from '../userContext';
import { useForm } from "react-hook-form";
import { setAuthToken, setUsuari } from '../slices/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { doLogin } from '../slices/auth/thunks';
import { redirect } from 'react-router-dom';


export const Login = ({ setLogin }) => {

    // Implementem codi de gestió 
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    let [error, setError] = useState("");
    let usuaris = []

    //let { usuari, setUsuari,authToken,setAuthToken } = useContext(UserContext)
    const { usuari, authToken } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    let token = JSON.parse(localStorage.getItem('authToken')) || "";

    usuaris = JSON.parse(localStorage.getItem('usuaris')) || [];

    const check_login = (data) => {
        console.log(data)
        const {email, password} = data;
        dispatch(doLogin(email, password));
        redirect('places/list');
    }

    return (

        <section
            className="absolute top-1/2 left-1/2 mx-auto max-w-sm -translate-x-1/2 -translate-y-1/2 transform space-y-4 text-center">


            <div  className="space-y-4">
                <header className="mb-3 text-2xl font-bold">Log in</header>
                <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="text" placeholder="Email or username"
                        //onChange={ (e)=> { setEmail(e.target.value)} }
                        {...register("email", {
                            required: "Por favor, introdueix el teu correu electrònic",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Por favor, introdueix un correu electrònic vàlid"
                            }
                        })}
                        className="my-3 w-full border-none bg-transparent outline-none focus:outline-none" />
                </div>
                {errors.email && <p className="text-red-600 bg-yellow-200 p-2">{errors.email.message}</p>}
                <div
                    className="flex w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input type="password" placeholder="Password"
                        {...register("password", { required: "Sisplau, la contrassenya no pot ser buida" })}
                        //onChange={ (e)=> { setPassword(e.target.value)} }
                        className="my-3 w-full border-none bg-transparent outline-none" />
                    <a href="#" className="font-medium text-gray-400 hover:text-gray-500">FORGOT?</a>
                </div>
                {errors.password && <p className="text-red-600 bg-yellow-200 p-2">{errors.password.message}</p>}
                <button onClick={handleSubmit(check_login)}
                    className="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400">
                    LOG IN
                </button>
            </div>

            {error && <p className="text-red-600 bg-yellow-200 p-2"> Usuari i/o contrasenya errònia</p>}

            <footer>

                <div className="mt-8 text-sm text-gray-400">
                    By signing in to ********, you agree to our
                    <a href="#" className="font-medium text-gray-500">Terms</a> and
                    <a href="#" className="font-medium text-gray-500">Privacy Policy</a>.
                </div>
                <div className="mt-8 text-sm text-gray-400">
                    <button onClick={() => setLogin(false)} className="underline">Not registered ?</button>
                </div>
            </footer>
        </section>
    )
}