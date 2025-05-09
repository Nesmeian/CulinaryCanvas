import { createSlice } from '@reduxjs/toolkit';

export const drawerSlice = createSlice({
    name: 'drawerSlice',
    initialState: { isOpen: true },
    reducers: {
        closeDrawer: (state) => {
            state.isOpen = true;
        },
    },
});

export const { closeDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
