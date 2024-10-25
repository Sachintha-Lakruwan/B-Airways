import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import jwt from "jsonwebtoken";

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    user: { userId: number, role : string } | null;
    error: string | null;
}

interface LoginCredentials {
    username: string;
    password: string;
}

const initialState: AuthState = {
    token: null,
    isAuthenticated : false,
    user : null,
    error: null
};

export const login = createAsyncThunk<
    string,
    LoginCredentials,
    { rejectValue: string }
>("auth/login", async ({ username, password }, thunkAPI) => {
    try {
        const response = await fetch("http://localhost:3000/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return thunkAPI.rejectWithValue(errorData.message);
        }

        const data = await response.json();
        return data.token;
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue("Network error");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem("token");
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            const decodedToken = jwt.decode(action.payload) as { 
                userId: number;
                role: string;
                iat: number;
                exp: number; 
            };
            state.isAuthenticated = true;
            state.user = { 
                userId: decodedToken.userId,
                role: decodedToken.role
            };
        },
        checkTokenValidity: (state) => {
            if (state.token) {
                const decodedToken = jwt.decode(state.token) as { exp: number };
                if (decodedToken.exp * 1000 < new Date().getTime()) {
                    state.token = null;
                    state.isAuthenticated = false;
                    state.user = null;
                    localStorage.removeItem("token");
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            login.fulfilled,
            (state, action: PayloadAction<string>) => {
                state.token = action.payload;

                const decodedToken = jwt.decode(action.payload) as { 
                    userId : number,
                    role : string,
                    iat : number,
                    exp: number 
                };

                state.isAuthenticated = true;
                state.user = { 
                    userId : decodedToken.userId,
                    role : decodedToken.role
                };
                localStorage.setItem("token", action.payload);
            }
        );
        builder.addCase(
            login.rejected,
            (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || "An error occurred";
            }
        );
    },
});

export const { logout, checkTokenValidity, setToken } = authSlice.actions;
export default authSlice.reducer;
