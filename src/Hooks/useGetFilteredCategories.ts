import React from 'react';

import { useGetCategoryQuery } from '~/query/services/get';
import { ComingCategoryData } from '~/types/comingData';

export function useFilteredCategories(subCategory?: boolean) {
    const { data } = useGetCategoryQuery();
    const [loading, setLoading] = React.useState(true);
    const [filtered, setFiltered] = React.useState<ComingCategoryData[]>([]);

    React.useEffect(() => {
        if (!data) return;
        const result = subCategory
            ? data.filter((item: ComingCategoryData) => !('subCategories' in item))
            : data.filter((item: ComingCategoryData) => 'subCategories' in item);
        setFiltered(result);
        setLoading(false);
    }, [data]);
    return { data: filtered, loading };
}
