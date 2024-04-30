import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authToken: "",
        usuari: ""
    },
    reducers: {
        setAuthToken: (state, action) => {
            state.authToken = action.payload
        },
        setUsuari: (state, action) => {
            state.usuari = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    },
})
export const { setAuthToken,setUsuari, setError } = authSlice.actions
export const authReducer = authSlice.reducer
