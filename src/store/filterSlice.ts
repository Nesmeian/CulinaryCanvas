import { createSlice } from '@reduxjs/toolkit';

import { FilterState } from '~/types/userTypes';

const initialState: FilterState = {
    isOpen: false,
};
export const filterSlice = createSlice({
    name: 'filterState',
    initialState,
    reducers: {
        toggleFilterState: (state) => {
            state.isOpen = !state.isOpen;
        },
        closeFilter: (state) => {
            state.isOpen = false;
        },
    },
});

export const { toggleFilterState, closeFilter } = filterSlice.actions;
export default filterSlice.reducer;
