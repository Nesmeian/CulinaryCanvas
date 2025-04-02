import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserData } from '~/types/userTypes';

import userImg from '../assets/userImg.png';

const initialState: UserData = {
    img: userImg,
    name: 'Екатерина',
    lastName: 'Константинопольская',
    email: '@bake_and_pie',
};
export const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<Partial<UserData>>) => ({
            ...state,
            ...action.payload,
        }),
    },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
