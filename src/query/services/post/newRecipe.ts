import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';
import { ComingRecipeData } from '~/types/comingData';
import { UploadedFile } from '~/types/NewRecipesTypes';
import { PostAuthRegType } from '~/types/postData';

export const newRecipePostApi = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.FILE, Tags.RECIPES],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            uploadFile: builder.mutation<void, UploadedFile>({
                query: (body) => ({
                    url: ApiEndpoints.UPLOAD_FILE,
                    method: 'POST',
                    body,
                    apiGroupName: ApiGroupNames.FILE,
                    name: EndpointNames.FILE,
                }),
                invalidatesTags: [Tags.FILE],
            }),
            createNewRecipe: builder.mutation<ComingRecipeData, PostAuthRegType>({
                query: (body) => ({
                    url: ApiEndpoints.RECIPES,
                    method: 'POST',
                    body,
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPES,
                }),
                invalidatesTags: [Tags.RECIPES],
            }),
        }),
    });

export const { useUploadFileMutation, useCreateNewRecipeMutation } = newRecipePostApi;
