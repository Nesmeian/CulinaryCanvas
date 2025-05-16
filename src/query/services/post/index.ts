import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';
import { setIsAuth } from '~/store/app-slice';
import { ResetPasswordType } from '~/types/LoginTypes';
import { forgotPassword, PostAuthRegType, PostLoginType, VerifyOTP } from '~/types/postData';

export const postsApiSlice = apiSlice
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
            postAuthLogin: builder.mutation<void, PostLoginType>({
                query: (body) => ({
                    url: ApiEndpoints.LOGIN,
                    method: 'POST',
                    body,
                    apiGroupName: ApiGroupNames.LOGIN,
                    name: EndpointNames.LOGIN,
                }),
                transformResponse: (_responseBody, meta) => {
                    const token = meta?.response?.headers.get('Authentication-Access');
                    if (token) {
                        localStorage.setItem('accessToken', token);
                    }
                },
                invalidatesTags: [Tags.LOGIN],
                onQueryStarted: (_, { queryFulfilled, dispatch }) => {
                    queryFulfilled.then(() => {
                        dispatch(setIsAuth(true));
                    });
                },
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
            verifyOtk: builder.mutation<void, VerifyOTP>({
                query: (body) => ({
                    url: ApiEndpoints.VERIFY_OTP,
                    method: 'POST',
                    body,
                    apiGroupName: ApiGroupNames.VERIFY_OTP,
                    name: EndpointNames.VERIFY_OTP,
                }),
            }),
            resetPassword: builder.mutation<void, ResetPasswordType>({
                query: (body) => ({
                    url: ApiEndpoints.RESET_PASSWORD,
                    method: 'POST',
                    body,
                    apiGroupName: ApiGroupNames.RESET_PASSWORD,
                    name: EndpointNames.RESET_PASSWORD,
                }),
            }),
        }),
    });

export const {
    usePostAuthSignUpMutation,
    usePostAuthLoginMutation,
    useForgotPasswordMutation,
    useVerifyOtkMutation,
    useResetPasswordMutation,
} = postsApiSlice;
