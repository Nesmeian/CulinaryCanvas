import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';
import { forgotPassword, PostAuthRegType, PostLoginType } from '~/types/postData';

export const postsApiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.POSTS],
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
                invalidatesTags: [Tags.POSTS],
            }),
            postAuthLogin: builder.mutation<void, PostLoginType>({
                query: (body) => ({
                    url: ApiEndpoints.LOGIN,
                    method: 'POST',
                    body,
                    apiGroupName: ApiGroupNames.AUTH,
                    name: EndpointNames.POST_AUTH,
                }),
                transformResponse: (_responseBody: unknown, meta) => {
                    const token = meta?.response?.headers.get('Authentication-Access');
                    if (token) {
                        localStorage.setItem('accessToken', token);
                    }
                },
                invalidatesTags: [Tags.POSTS],
            }),
            forgotPassword: builder.mutation<void, forgotPassword>({
                query: (body) => ({
                    url: ApiEndpoints.FORGOT_PASSWORD,
                    method: 'POST',
                    body,
                    apiGroupName: ApiGroupNames.FORGOT_PASSWORD,
                    name: EndpointNames.FORGOT_PASSWORD,
                }),
            }),
        }),
    });

export const { usePostAuthSignUpMutation, usePostAuthLoginMutation, useForgotPasswordMutation } =
    postsApiSlice;
