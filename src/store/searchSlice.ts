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
        cleanSearch: (state) => {
            state.search = '';
            state.allowSearch = false;
            state.findElems = 'common';
        },
    },
});

export const { setAllowSearch, setFindState, setSearchState, cleanSearch } = searchSlice.actions;
export default searchSlice.reducer;
