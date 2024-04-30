import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { doRegister } from "../slices/auth/thunks";
import { URL_API } from "../constants";

export const Register = ({ setLogin }) => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();

    let [error, setError] = useState(null);

    const check_register = (data) => {
        dispatch(doRegister(data));
    }

    return (
        <section className="absolute top-1/2 left-1/2 mx-auto max-w-sm -translate-x-1/2 -translate-y-1/2 transform space-y-4 text-center">
            <div className="space-y-4">
                <header className="mb-3 text-2xl font-bold">Crea Usuario</header>

                <form onSubmit={handleSubmit(check_register)}>
                    <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                        <input
                            type="text"
                            {...register("name", {
                                required: "Este campo es obligatorio"
                            })}
                            placeholder="Nombre"
                            className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
                        />
                    </div>
                    <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                        <input
                            type="text"
                            {...register("email", {
                                required: "Este campo es obligatorio",
                                pattern: {
                                    value: /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/,
                                    message: "Por favor, introduce un correo válido"
                                }
                            })}
                            placeholder="Email"
                            className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
                        />
                    </div>
                    {errors.email && (
                        <div className="text-red-500">
                            {errors.email.message}
                        </div>
                    )}
                    <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                        <input
                            type="password"
                            {...register("password", {
                                validate: (value) =>
                                    value === getValues("password2") ||
                                    "Las contraseñas deben coincidir",
                                required: "Este campo es obligatorio",
                                minLength: {
                                    value: 8,
                                    message: "La contraseña debe tener al menos 8 caracteres",
                                },
                                maxLength: {
                                    value: 20,
                                    message: "La contraseña debe tener como máximo 20 caracteres",
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                                    message: "La contraseña debe contener al menos una minúscula, una mayúscula y un número",
                                },
                            })}
                            placeholder="Contraseña"
                            className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
                        />
                    </div>
                    <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                        <input
                            type="password"
                            {...register("password2")}
                            placeholder="Repetir Contraseña"
                            className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
                        />
                    </div>
                    {errors.password && (
                        <div className="text-red-500">
                            {errors.password.message}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400"
                    >
                        CREAR CUENTA
                    </button>
                </form>

                {error && (
                    <div className="text-red-500">
                        {error}
                    </div>
                )}

                <div className="mt-8 text-sm text-gray-400">
                    <button onClick={() => setLogin(true)} className="underline">
                        ¿Ya registrado?
                    </button>
                </div>
            </div>
        </section>
    );
};
