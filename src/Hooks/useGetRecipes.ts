import { useState } from 'react';

import { useGetRecipesByCategoryQuery } from '~/query/services/get';

export const useGetRecipes = (id?: string) => {
    const [limit, setLimit] = useState(8);

    const { data, isLoading, isError } = useGetRecipesByCategoryQuery({ limit, id });
    console.log(data);
    const loadMore = () => setLimit((prev) => prev + 8);

    return { data, isLoading, loadMore, isError };
};
