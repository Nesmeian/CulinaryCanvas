import { ApiEndpoints } from '~/query/constants/api';
import { ApiGroupNames } from '~/query/constants/api-group-names';
import { EndpointNames } from '~/query/constants/endpoint-names';
import { Tags } from '~/query/constants/tags';
import { apiSlice } from '~/query/create-api';

import { BloggerParams } from './types';

export const BlogsSlice = apiSlice.enhanceEndpoints({ addTagTypes: [Tags.BLOGS] }).injectEndpoints({
    endpoints: (builder) => ({
        getBlogs: builder.query<BloggerParams, void>({
            query: () => ({
                url: ApiEndpoints.BLOGS,
                method: 'GET',
                params: {
                    currentUserId: localStorage.getItem('accessToken'),
                },
                apiGroupName: ApiGroupNames.BLOGS,
                name: EndpointNames.BLOGS,
            }),
        }),
    }),
});
export const { useGetBlogsQuery } = BlogsSlice;
