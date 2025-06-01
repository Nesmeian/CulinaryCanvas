import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';

export const deleteRecipeApi = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.RECIPES],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            deleteRecipe: builder.mutation<void, string>({
                query: (payload) => ({
                    url: `${ApiEndpoints.RECIPES}/${payload}`,
                    method: 'DELETE',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPES,
                }),
                invalidatesTags: [Tags.RECIPES],
            }),
        }),
    });

export const { useDeleteRecipeMutation } = deleteRecipeApi;
