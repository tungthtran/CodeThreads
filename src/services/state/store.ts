import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userProfileReducer from "./slices/userProfileSlice";
import threadReducer from "./slices/threadSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        userProfile: userProfileReducer,
        thread: threadReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;