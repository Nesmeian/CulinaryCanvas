import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';

export const getRefreshSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.REFRESH],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getRefreshToken: builder.query<void, void>({
                query: () => ({
                    url: ApiEndpoints.REFRESH_TOKEN,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.REFRESH,
                    name: EndpointNames.REFRESH,
                }),
                providesTags: [Tags.REFRESH],
            }),
        }),
    });

export const { useGetRefreshTokenQuery } = getRefreshSlice;
