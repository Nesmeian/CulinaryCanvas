import { createSlice } from '@reduxjs/toolkit';

import { CategoryState } from '~/types/userTypes';

const initialState: CategoryState = {
    subCategory: '',
    category: '',
    subCategoryId: '',
    categoryId: '',
};
export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {
        changeCategory: (state, action) => {
            const [category, categoryId] = action.payload;
            state.category = category;
            state.categoryId = categoryId;
        },
        changeSubCategory: (state, action) => {
            const [subCategory, subCategoryId] = action.payload;
            state.subCategory = subCategory;
            state.subCategoryId = subCategoryId;
        },
    },
});

export const { changeCategory, changeSubCategory } = categorySlice.actions;
export default categorySlice.reducer;
