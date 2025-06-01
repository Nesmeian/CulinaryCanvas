import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';
import { PostAuthRegType } from '~/types/postData';

export const postsRegLoginSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.POSTS, Tags.AUTH_TOKEN, Tags.LOGIN],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            postAuthSignUp: builder.mutation<void, PostAuthRegType>({
                query: (body) => ({
                    url: ApiEndpoints.SIGNUP,
                    method: 'POST',
                    body,
                    apiGroupName: ApiGroupNames.AUTH,
                    name: EndpointNames.POST_AUTH,
                }),
                invalidatesTags: [Tags.AUTH_TOKEN],
            }),
        }),
    });

export const { usePostAuthSignUpMutation } = postsRegLoginSlice;
