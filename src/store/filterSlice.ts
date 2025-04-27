import { createSlice } from '@reduxjs/toolkit';

import { FilterState } from '~/types/userTypes';

const initialState: FilterState = {
    isOpen: false,
    filterData: {
        allergens: [],
        sideDish: [],
        meat: [],
        category: '',
        auth: '',
    },
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
        addFilterData: (state, action) => {
            state.filterData = action.payload;
        },
        cleanFilterData: (state) => {
            state.filterData = {
                allergens: [],
                sideDish: [],
                meat: [],
                category: '',
                auth: '',
            };
        },
    },
});

export const { toggleFilterState, closeFilter, addFilterData, cleanFilterData } =
    filterSlice.actions;
export default filterSlice.reducer;
