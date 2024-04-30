import { redirect } from "react-router-dom";
import { setAuthToken, setUsuari } from "./authSlice";
import { data } from "autoprefixer";

export const doLogin = (email, password) => {

    return async (dispatch, getState) => {
    // Enviem dades a l'aPI i recollim resultat
        try {
            const data = await fetch("https://backend.insjoaquimmir.cat/api/login", {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //"Access-Control-Allow-Origin": "*" 
            },
                method: "POST",
                body: JSON.stringify({ email: email, password: password })
            })
            const resposta = await data.json()
            dispatch(setUsuari(email));
            console.log('llegas', email)
            if (resposta.success === true) {
                localStorage.setItem('authToken', JSON.stringify(resposta.authToken));
                dispatch(setUsuari(email));
                dispatch(setAuthToken(resposta.authToken));
            }
            else {
                // Aquest és un estat que no està a l'Slice
                // Per tant convindria crear-ne un
                // I treure el del component
                // dispatch(setError(resposta.message));
            }
        }
        catch (err) {
            // dispatch(setError("Network error"))
        }
    }
}

export const doRegister = (data) => {
    return async (dispatch) => {
        try {
            const response = await fetch("https://backend.insjoaquimmir.cat/api/register", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(data)
            });

            const resposta = await response.json();

            if (response.ok && resposta.success === true) {
                alert("¡Registro exitoso!");
                // Dispatch actions here if needed
            } else {
                throw new Error(resposta.message || "Error en la solicitud");
            }
        } catch (error) {
            console.error(error.message);
            alert(error.message || "Error en la solicitud");
            // Handle error dispatching here if needed
        }
    };
};


export const doLogout = () => {
    return async (dispatch, getState) => {
        try {
            const authToken = getState().auth.authToken; // Obtener el authToken del estado

            const data = await fetch("https://backend.insjoaquimmir.cat/api/logout", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`, // Utilizar el authToken almacenado
                },
                method: "POST",
            });
            const response = await data.json();

            if (response.success) {
                localStorage.removeItem('authToken');
                dispatch(setAuthToken(null));
            } else {
                console.log(response);
                alert("Error al cerrar sesión");
            }
        } catch (error) {
            console.error("Error en logout:", error);
            alert("Error al cerrar sesión");
        }
    };
};