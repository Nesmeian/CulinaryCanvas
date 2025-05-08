import { skipToken } from '@reduxjs/toolkit/query';
import { useState } from 'react';

import { useGetRecipesByCategoryQuery } from '~/query/services/get';

export const useGetRecipes = (id?: string) => {
    const [limit, setLimit] = useState(8);
    const queryArg = id ? { limit, id } : skipToken;
    const { data, isLoading, isError } = useGetRecipesByCategoryQuery(queryArg);
    const loadMore = () => setLimit((prev) => prev * 2);

    return { data, isLoading, loadMore, isError };
};
