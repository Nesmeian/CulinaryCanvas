import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';
import { ComingCategoryData, ComingRecipeData, ComingRecipeDataProps } from '~/types/comingData';

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
                    url: `${ApiEndpoints.CATEGORY}/${id}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.CATEGORY,
                    name: EndpointNames.GET_CATEGORY,
                }),
                providesTags: [Tags.CATEGORY],
            }),
            getRecipes: builder.query<
                ComingRecipeDataProps,
                {
                    limit: number;
                    subcategory?: string | undefined;
                    searchString?: string;
                    allergens?: string;
                    meat?: string;
                    garnish?: string;
                }
            >({
                query: ({ limit, subcategory, searchString, allergens, meat, garnish }) => ({
                    url: ApiEndpoints.RECIPES,
                    method: 'GET',
                    params: {
                        allergens: allergens,
                        searchString: searchString,
                        subcategoriesIds: subcategory,
                        limit: limit,
                        meat: meat,
                        garnish: garnish,
                    },
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPES,
                }),
                providesTags: [Tags.RECIPES],
            }),
            getRecipesByCategory: builder.query<
                ComingRecipeDataProps,
                { limit?: number; id?: string; searchString?: string }
            >({
                query: ({ limit, id, searchString }) => ({
                    url: `${ApiEndpoints.RECIPES_CATEGORY}/${id}`,
                    method: 'GET',
                    params: { limit, searchString },
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPES,
                }),
                providesTags: [Tags.RECIPES],
            }),
            getRecipeById: builder.query<ComingRecipeData, string>({
                query: (id) => ({
                    url: `${ApiEndpoints.RECIPES}/${id}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPES,
                }),
                providesTags: [Tags.RECIPES],
            }),
            getSortedAtLikes: builder.query<ComingRecipeDataProps, { limit: number; page: number }>(
                {
                    query: ({ limit, page }) => ({
                        url: ApiEndpoints.RECIPES,
                        method: 'GET',
                        apiGroupName: ApiGroupNames.RECIPES,
                        name: EndpointNames.GET_RECIPES,
                        params: {
                            sortBy: 'likes',
                            sortOrder: 'desc',
                            limit,
                            page,
                        },
                    }),
                    providesTags: [Tags.RECIPES],
                },
            ),
            getSortedAtTimeRecipes: builder.query<ComingRecipeDataProps, void>({
                query: () => ({
                    url: ApiEndpoints.RECIPES,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPES,
                    params: {
                        limit: 10,
                        sortBy: 'createdAt',
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
    useLazyGetSortedAtLikesQuery,
    useGetRecipeByIdQuery,
    useGetRecipesByCategoryQuery,
} = getApiSlice;
