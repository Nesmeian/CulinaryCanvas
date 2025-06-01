import {
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { setIsAuth } from '~/store/app-slice';

import { Tags } from './constants/tags';
const baseFetch = fetchBaseQuery({
    baseUrl: 'https://marathon-api.clevertec.ru',
    credentials: 'include',
    prepareHeaders: (headers) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }
        return headers;
    },
});
const baseQueryWithReauth = async (args: string | FetchArgs, api, extraOptions) => {
    let result = await baseFetch(args, api, extraOptions);

    if ((result.error as FetchBaseQueryError)?.status === 401) {
        const refreshResult = await baseFetch(
            {
                url: '/auth/refresh',
                method: 'POST',
            },
            api,
            extraOptions,
        );

        if (refreshResult.data) {
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
                refreshResult.data as {
                    accessToken: string;
                    refreshToken?: string;
                };

            localStorage.setItem('accessToken', newAccessToken);
            if (newRefreshToken) {
                localStorage.setItem('refreshToken', newRefreshToken);
            }

            result = await baseFetch(args, api, extraOptions);
        } else {
            api.dispatch(setIsAuth(false));
        }
    }

    return result;
};
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: Object.values(Tags),
    endpoints: () => ({}),
});
