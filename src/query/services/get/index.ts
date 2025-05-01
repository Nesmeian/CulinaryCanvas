import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';
import { ComingCategoryData } from '~/types/comingData';

export const getApiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.CATEGORY],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getCategory: builder.query<ComingCategoryData[], void>({
                query: () => ({
                    url: ApiEndpoints.CATEGORY,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.CATEGORY,
                    name: EndpointNames.GET_CATEGORY,
                }),
                providesTags: [Tags.CATEGORY],
            }),
        }),
    });

export const { useGetCategoryQuery } = getApiSlice;
