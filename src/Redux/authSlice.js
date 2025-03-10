import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null, // Retrieve user data from localStorage
    token: localStorage.getItem("access_token") || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user; // Save user details
            state.token = action.payload.token;

            localStorage.setItem("user", JSON.stringify(action.payload.user)); // Store user in localStorage
            localStorage.setItem("access_token", action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;

            localStorage.removeItem("user");
            localStorage.removeItem("access_token");
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
