import { useState } from 'react';

import { useGetSortedAtLikesQuery } from '~/query/services/get';

export const useGetJuiciest = (limit: number) => {
    const [stateLimit, setLimit] = useState(limit);
    const { data, isLoading, isError } = useGetSortedAtLikesQuery(stateLimit);
    const loadMore = () => setLimit((prev) => prev + 8);

    return { data, isLoading, loadMore, isError };
};
