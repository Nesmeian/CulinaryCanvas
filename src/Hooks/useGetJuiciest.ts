import { useState } from 'react';

import { useGetSortedAtLikesQuery } from '~/query/services/get';

export const useGetJuiciest = () => {
    const [limit, setLimit] = useState(8);
    const { data, isLoading } = useGetSortedAtLikesQuery(limit);

    const loadMore = () => setLimit((prev) => prev + 8);

    return { data, isLoading, loadMore };
};
