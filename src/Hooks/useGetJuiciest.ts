import React from 'react';

import { useGetSortedAtLikesQuery } from '~/query/services/get';
import { ComingRecipeDataProps } from '~/types/comingData';

export const useGetJuiciest = () => {
    const { data } = useGetSortedAtLikesQuery();
    const [loading, setLoading] = React.useState(true);
    const [sortedData, setSortedData] = React.useState<ComingRecipeDataProps>();
    React.useEffect(() => {
        if (!data) return;
        setLoading(false);
        setSortedData(data);
    }, [data]);
    return { data: sortedData, loading };
};
