import { ApiEndpoints } from '~/query/constants/api';
import { ApiGroupNames } from '~/query/constants/api-group-names';
import { EndpointNames } from '~/query/constants/endpoint-names';
import { Tags } from '~/query/constants/tags';
import { apiSlice } from '~/query/create-api';
import { decodeToken } from '~/utils/decodeToken';

import { BloggerInfoType, UserBlogData } from './types';
const BlogSlice = apiSlice.enhanceEndpoints({ addTagTypes: [Tags.BLOGS] }).injectEndpoints({
    endpoints: (builder) => ({
        getBlogById: builder.query<BloggerInfoType, string>({
            query: (id) => {
                const token = localStorage.getItem('accessToken');
                let userId: string | undefined;
                try {
                    userId = token ? decodeToken(token)?.userId : undefined;
                } catch {
                    userId = undefined;
                }
                return {
                    url: `${ApiEndpoints.BLOGS}/${id}`,
                    method: 'GET',
                    params: { currentUserId: userId },
                    apiGroupName: ApiGroupNames.BLOGS,
                    name: EndpointNames.BLOG_ID,
                };
            },
            providesTags: [Tags.BLOGS],
        }),
        getRecipesBlogById: builder.query<UserBlogData, string>({
            query: (id) => {
                const token = localStorage.getItem('accessToken');
                let userId: string | undefined;
                try {
                    userId = token ? decodeToken(token)?.userId : undefined;
                } catch {
                    userId = undefined;
                }
                return {
                    url: `${ApiEndpoints.RECIPE_BLOGS}/${id}`,
                    method: 'GET',
                    params: { currentUserId: userId },
                    apiGroupName: ApiGroupNames.BLOGS,
                    name: EndpointNames.RECIPE_BLOGS,
                };
            },
            providesTags: [Tags.BLOGS],
        }),
    }),
});
export const { useGetBlogByIdQuery, useGetRecipesBlogByIdQuery } = BlogSlice;
