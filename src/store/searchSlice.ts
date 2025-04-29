import { createSlice } from '@reduxjs/toolkit';

import { SearchState } from '~/types/userTypes';

const initialState: SearchState = {
    search: '',
    allowSearch: false,
    findElems: 'common',
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
        setFindState: (state, action) => {
            state.findElems = action.payload;
        },
    },
});

export const { setAllowSearch, setFindState, setSearchState } = searchSlice.actions;
export default searchSlice.reducer;
