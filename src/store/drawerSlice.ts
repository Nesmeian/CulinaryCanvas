import { createSlice } from '@reduxjs/toolkit';

export const drawerSlice = createSlice({
    name: 'drawerSlice',
    initialState: { isOpen: false },
    reducers: {
        closeDrawer: (state) => {
            state.isOpen = false;
        },
    },
});

export const { closeDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
