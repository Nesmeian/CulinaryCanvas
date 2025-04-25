import { createSlice } from '@reduxjs/toolkit';

import { SearchState } from '~/types/userTypes';

const initialState: SearchState = {
    search: '',
    allowSearch: false,
};
export const searchSlice = createSlice({
    name: 'searchState',
    initialState,
    reducers: {
        setSearchState: (state, action) => {
            state.search = action.payload;
        },
        setAllowSearch: (state, action) => {
            state.allowSearch = action.payload;
        },
    },
});

export const { setSearchState } = searchSlice.actions;
export const { setAllowSearch } = searchSlice.actions;
export default searchSlice.reducer;
