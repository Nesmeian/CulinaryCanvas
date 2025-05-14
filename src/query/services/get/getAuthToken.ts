import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';

export const getRefreshSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.AUTH_TOKEN],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            checkAuthToken: builder.query<void, void>({
                query: () => ({
                    url: ApiEndpoints.CHECK_AUTH_TOKEN,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.AUTH_TOKEN,
                    name: EndpointNames.AUTH_TOKEN,
                }),
                providesTags: [Tags.AUTH_TOKEN],
            }),
            getRefreshToken: builder.query<void, void>({
                query: () => ({
                    url: ApiEndpoints.REFRESH_TOKEN,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.AUTH_TOKEN,
                    name: EndpointNames.AUTH_TOKEN,
                }),
                providesTags: [Tags.AUTH_TOKEN],
            }),
        }),
    });

export const { useGetRefreshTokenQuery, useCheckAuthTokenQuery } = getRefreshSlice;
