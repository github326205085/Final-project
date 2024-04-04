import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token") || "",
        role:localStorage.getItem("role") || "",
        id:localStorage.getItem("id") || "",
        isUserLoggedIn: localStorage.getItem("token") ? true : false,
        userFullName: "",
    },
    reducers: {
        setToken: (state, action) => {
            const token = action.payload.token
            const role = action.payload.role
            const id = action.payload.id
            state.token = token
            state.role=role
            state.id = id
            state.isUserLoggedIn = true
            localStorage.setItem("token", token)
            localStorage.setItem("role", role)
            localStorage.setItem("id", id)
        },
        removeToken: (state) => {
            state.token = ""
            state.isUserLoggedIn = false
            localStorage.removeItem("token")
        }
    }
})
export default authSlice.reducer
export const { setToken, removeToken } = authSlice.actions