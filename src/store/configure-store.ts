import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '../query/create-api';
import { allergensSlice } from './allergens';
import appReducer, { appSlice } from './app-slice';
import { burgerSlice } from './burgerSlice';
import { categorySlice } from './category';
import { filterSlice } from './filterSlice';
import { searchSlice } from './searchSlice';
import userReducer, { userSlice } from './userSlice';
const isProduction = false;
const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [userSlice.name]: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [burgerSlice.name]: burgerSlice.reducer,
    [filterSlice.name]: filterSlice.reducer,
    [searchSlice.name]: searchSlice.reducer,
    [allergensSlice.name]: allergensSlice.reducer,
    [categorySlice.name]: categorySlice.reducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: !isProduction,
});
