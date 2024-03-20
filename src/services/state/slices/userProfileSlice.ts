import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserProfileState {
    fullName: string,
    email: string,
    phoneNumber: string,
    address: string
}

const initialState: UserProfileState = {
    fullName: "Tung Tran",
    email: "tung.tran@gmail.com",
    phoneNumber: "(+84) 988765876",
    address: "348 E 48th St, New York NY 10009"
}

const userProfileSlice = createSlice({
    name: "userProfile",
    initialState,
    reducers: {
        setUserProfile: (state, action: PayloadAction<UserProfileState>) => {
            state.fullName = action.payload.fullName;
            state.email = action.payload.email;
            state.phoneNumber = action.payload.phoneNumber;
            state.address = action.payload.address;
        }
    }
})

export const { setUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;