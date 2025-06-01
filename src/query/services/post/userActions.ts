import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';

export const userActionsApi = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.FILE, Tags.RECIPES],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            bookmarkRecipe: builder.mutation<void, string>({
                query: (payload) => ({
                    url: `${ApiEndpoints.RECIPES}/${payload}/bookmark`,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.USER_ACTIONS,
                    name: EndpointNames.USER_ACTIONS,
                }),
                invalidatesTags: [Tags.RECIPES],
            }),
            likeRecipe: builder.mutation<void, string>({
                query: (payload) => ({
                    url: `${ApiEndpoints.RECIPES}/${payload}/like`,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.USER_ACTIONS,
                    name: EndpointNames.USER_ACTIONS,
                }),
                invalidatesTags: [Tags.RECIPES],
            }),
        }),
    });

export const { useBookmarkRecipeMutation, useLikeRecipeMutation } = userActionsApi;
