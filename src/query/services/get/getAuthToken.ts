import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';
import { setIsAuth } from '~/store/app-slice';

export const getAuthToken = apiSlice
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
                onQueryStarted: (_, { queryFulfilled, dispatch }) => {
                    queryFulfilled.then(() => {
                        dispatch(setIsAuth(true));
                    });
                },
            }),
        }),
    });

export const { useCheckAuthTokenQuery } = getAuthToken;
