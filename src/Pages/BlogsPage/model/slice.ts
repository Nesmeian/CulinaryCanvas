import { ApiEndpoints } from '~/query/constants/api';
import { ApiGroupNames } from '~/query/constants/api-group-names';
import { EndpointNames } from '~/query/constants/endpoint-names';
import { Tags } from '~/query/constants/tags';
import { apiSlice } from '~/query/create-api';
import { decodeToken } from '~/utils/decodeToken';

import { BloggerQueryParams, GetBlogsArgs } from './types';
const userId = decodeToken(localStorage.getItem('accessToken'))?.userId;
export const BlogsSlice = apiSlice.enhanceEndpoints({ addTagTypes: [Tags.BLOGS] }).injectEndpoints({
    endpoints: (builder) => ({
        getBlogs: builder.query<BloggerQueryParams, GetBlogsArgs>({
            query: ({ limit = 3 } = {}) => ({
                url: ApiEndpoints.BLOGS,
                method: 'GET',
                params: {
                    limit: limit,
                    currentUserId: userId,
                },
                apiGroupName: ApiGroupNames.BLOGS,
                name: EndpointNames.BLOGS,
            }),
            providesTags: [Tags.BLOGS],
        }),
        toggleSubscription: builder.mutation<void, string>({
            query: (toggleUser) => ({
                url: ApiEndpoints.TOGGLE_SUBSCRIPTION,
                method: 'PATCH',
                body: {
                    fromUserId: userId,
                    toUserId: toggleUser,
                },
                apiGroupName: ApiGroupNames.BLOGS,
                name: EndpointNames.BLOGS,
            }),
            invalidatesTags: [Tags.BLOGS],
        }),
    }),
});
export const { useGetBlogsQuery, useToggleSubscriptionMutation } = BlogsSlice;
