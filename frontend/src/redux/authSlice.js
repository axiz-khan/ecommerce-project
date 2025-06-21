import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        role: null, // Add role field
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.role = action.payload.role; // Set role from payload
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.role = null; // Clear role on logout
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
