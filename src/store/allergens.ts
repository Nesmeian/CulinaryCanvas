import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AllergensState } from '~/types/userTypes';

const initialState: AllergensState = {
    isActive: false,
    allergens: [],
};
export const allergensSlice = createSlice({
    name: 'allergensSlice',
    initialState,
    reducers: {
        toggleAllergenState: (state) => {
            state.isActive = !state.isActive;
        },
        toggleAllergen: (state, action: PayloadAction<string>) => {
            const item = action.payload;
            if (state.allergens.includes(item)) {
                state.allergens = state.allergens.filter((a) => a !== item);
            } else {
                state.allergens.push(item);
            }
        },
        cleanAllergens: (state) => {
            state.allergens = [];
        },
        stopAllergens: (state) => {
            state.isActive = false;
        },
    },
});

export const { toggleAllergenState, toggleAllergen, cleanAllergens, stopAllergens } =
    allergensSlice.actions;
export default allergensSlice.reducer;
