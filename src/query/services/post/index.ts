import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';
import { PostAuthRegType } from '~/types/postData';

export const postsApiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.POSTS],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            postAuthSignUp: builder.mutation<void, PostAuthRegType>({
                query: (body) => ({
                    url: ApiEndpoints.POSTS,
                    method: 'POST',
                    body,
                    apiGroupName: ApiGroupNames.AUTH,
                    name: EndpointNames.POST_AUTH,
                }),
                invalidatesTags: [Tags.POSTS],
            }),
        }),
    });

export const { usePostAuthSignUpMutation } = postsApiSlice;
