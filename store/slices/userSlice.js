import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Asynchronous Thunk for logging in
export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/user/login`, { email, password });
            const { user, token } = response.data;
            // Save the token in localStorage
            localStorage.setItem('jwtToken', token);
            return { user, token };
        } catch (err) {
            return rejectWithValue(err.response.data); // Return error message
        }
    }
);

// Asynchronous Thunk for logging in with JWT token
export const loginWithToken = createAsyncThunk(
    'user/loginWithToken',
    async ({ token }, { rejectWithValue }) => {
        try {

            const response = await axios.post(`${BASE_URL}/api/user/login-with-token`, { token });
            const { user, newToken } = response.data;

            localStorage.setItem('jwtToken', newToken);

            return { user, token: newToken };

        } catch (err) {
            localStorage.removeItem('jwtToken'); // Remove token if it's invalid
            return rejectWithValue(err.response ? err.response.data : { message: err.message });
        }
    }
);

// Asynchronous Thunk for logging out
export const logout = createAsyncThunk(
    'user/logout',
    async (_, { dispatch }) => {
        // You can perform any additional cleanup if needed
        localStorage.removeItem('jwtToken'); // Remove token from localStorage
        dispatch(clearUser()); // Dispatch clearUser to update state
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
    },
    reducers: {
        // For logging out
        clearUser(state) {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        // Handle login cases
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user; // Fixed payload property name
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Handle login with token cases
            .addCase(loginWithToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginWithToken.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user; // Fixed payload property name
                state.token = action.payload.token;
            })
            .addCase(loginWithToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
