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
            getRecipes: builder.query<ComingRecipeDataProps, string>({
                query: (subcategory) => ({
                    url: ApiEndpoints.RECIPES,
                    method: 'GET',
                    params: {
                        subcategoriesIds: subcategory,
                    },
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPES,
                }),
                providesTags: [Tags.RECIPES],
            }),
            getSortedAtLikes: builder.query<ComingRecipeDataProps, void>({
                query: () => ({
                    url: ApiEndpoints.RECIPES,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPES,
                    params: {
                        sortBy: 'likes',
                        sortOrder: 'desc',
                    },
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
                        limit: 10,
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
    useGetRecipesQuery,
    useGetSortedAtLikesQuery,
} = getApiSlice;
