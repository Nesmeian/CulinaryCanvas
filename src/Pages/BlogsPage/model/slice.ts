import { ApiEndpoints } from '~/query/constants/api';
import { ApiGroupNames } from '~/query/constants/api-group-names';
import { EndpointNames } from '~/query/constants/endpoint-names';
import { Tags } from '~/query/constants/tags';
import { apiSlice } from '~/query/create-api';

import { BloggerParams, GetBlogsArgs } from './types';

export const BlogsSlice = apiSlice.enhanceEndpoints({ addTagTypes: [Tags.BLOGS] }).injectEndpoints({
    endpoints: (builder) => ({
        getBlogs: builder.query<BloggerParams, GetBlogsArgs>({
            query: ({ limit = 9 } = {}) => ({
                url: ApiEndpoints.BLOGS,
                method: 'GET',
                params: {
                    limit: limit,
                    currentUserId: localStorage.getItem('accessToken'),
                },
                apiGroupName: ApiGroupNames.BLOGS,
                name: EndpointNames.BLOGS,
            }),
        }),
    }),
});
export const { useGetBlogsQuery } = BlogsSlice;
