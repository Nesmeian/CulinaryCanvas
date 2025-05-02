import React from 'react';

import { useGetSortedAtTimeRecipesQuery } from '~/query/services/get';
import { ComingRecipeDataProps } from '~/types/comingData';

export const useFilteredOnDataRecipes = () => {
    const { data } = useGetSortedAtTimeRecipesQuery();
    const [loading, setLoading] = React.useState(true);
    const [sortedData, setSortedData] = React.useState<ComingRecipeDataProps>();
    React.useEffect(() => {
        if (!data) return;
        setLoading(false);
        setSortedData(data);
    }, [data]);
    return { data: sortedData, loading };
};
