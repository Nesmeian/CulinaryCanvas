import { createSlice } from '@reduxjs/toolkit';

import { BurgerState } from '~/types/userTypes';

const initialState: BurgerState = {
    isOpen: false,
};
export const burgerSlice = createSlice({
    name: 'burgerState',
    initialState,
    reducers: {
        toggleBurgerState: (state) => {
            state.isOpen = !state.isOpen;
        },
    },
});

export const { toggleBurgerState } = burgerSlice.actions;
export default burgerSlice.reducer;
