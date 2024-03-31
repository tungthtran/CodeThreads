import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: string | null,
    accessToken: string | null,
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<string | null>) => {
            state.user = action.payload;
        },
        setAccessToken: (state, action: PayloadAction<string | null>) => {
            state.accessToken = action.payload;
        }
    }
})

export const { setUser, setAccessToken } = authSlice.actions;
export default authSlice.reducer;