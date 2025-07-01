import { ApiEndpoints } from '~/query/constants/api';
import { ApiGroupNames } from '~/query/constants/api-group-names';
import { EndpointNames } from '~/query/constants/endpoint-names';
import { Tags } from '~/query/constants/tags';
import { apiSlice } from '~/query/create-api';
import { decodeToken } from '~/utils/decodeToken';

import { BloggerInfoType, UserBlogData } from './types';
const userId = decodeToken(localStorage.getItem('accessToken')).userId;
const BlogSlice = apiSlice.enhanceEndpoints({ addTagTypes: [Tags.BLOGS] }).injectEndpoints({
    endpoints: (builder) => ({
        getBlogById: builder.query<BloggerInfoType, string>({
            query: (id) => ({
                url: `${ApiEndpoints.BLOGS}/${id}`,
                method: 'GET',
                params: {
                    currentUserId: userId,
                },
                apiGroupName: ApiGroupNames.BLOGS,
                name: EndpointNames.BLOG_ID,
            }),
            providesTags: [Tags.BLOGS],
        }),
        getRecipesBlogById: builder.query<UserBlogData, string>({
            query: (id) => ({
                url: `${ApiEndpoints.RECIPE_BLOGS}/${id}`,
                method: 'GET',
                params: {
                    currentUserId: userId,
                },
                apiGroupName: ApiGroupNames.BLOGS,
                name: EndpointNames.RECIPE_BLOGS,
            }),
            providesTags: [Tags.BLOGS],
        }),
    }),
});
export const { useGetBlogByIdQuery, useGetRecipesBlogByIdQuery } = BlogSlice;
