import { createSlice } from '@reduxjs/toolkit';

import { BigCardsProps } from '~/types/userTypes';

const initialState: BigCardsProps = {
    cards: [],
};
export const bigCardSlice = createSlice({
    name: 'bigCardSlice',
    initialState,
    reducers: {
        addCards: (state, action) => {
            state.cards = [...state.cards, ...action.payload];
        },
        cleanBigCards: (state) => {
            state.cards = [];
        },
        setNewArr: (state, action) => {
            state.cards = action.payload;
        },
    },
});

export const { addCards, cleanBigCards, setNewArr } = bigCardSlice.actions;
export default bigCardSlice.reducer;
