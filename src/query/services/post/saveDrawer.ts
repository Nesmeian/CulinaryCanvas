import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';
import { RecipeFields } from '~/types/NewRecipesTypes';

export const saveDraftApi = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.DRAFT],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            saveDraft: builder.mutation<void, RecipeFields>({
                query: (payload) => ({
                    url: ApiEndpoints.SAVE_DRAFT,
                    method: 'POST',
                    body: payload,
                    apiGroupName: ApiGroupNames.DRAFT,
                    name: EndpointNames.DRAFT,
                }),
                invalidatesTags: [Tags.DRAFT],
            }),
        }),
    });

export const { useSaveDraftMutation } = saveDraftApi;
