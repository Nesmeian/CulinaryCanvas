import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';
import { ComingCategoryData, ComingRecipeDataProps } from '~/types/comingData';

export const getApiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.CATEGORY, Tags.RECIPES],
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

            getCategoryId: builder.query<ComingCategoryData, string>({
                query: (id) => ({
                    url: `${ApiEndpoints.CATEGORY}${id}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.CATEGORY,
                    name: EndpointNames.GET_CATEGORY,
                }),
                providesTags: [Tags.CATEGORY],
            }),
            getRecipeByCategoryId: builder.query<ComingCategoryData, string>({
                query: () => ({
                    url: `${ApiEndpoints.RECIPES_CATEGORY}${'67c4941eed67ca980917d653'}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPES,
                }),
                providesTags: [Tags.RECIPES],
            }),
            getSortedAtTimeRecipes: builder.query<ComingRecipeDataProps, void>({
                query: () => ({
                    url: ApiEndpoints.RECIPES,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPES,
                    params: {
                        sortOrder: 'desc',
                    },
                }),
                providesTags: [Tags.RECIPES],
            }),
        }),
    });

export const {
    useGetCategoryQuery,
    useGetSortedAtTimeRecipesQuery,
    useGetCategoryIdQuery,
    useGetRecipeByCategoryIdQuery,
} = getApiSlice;
