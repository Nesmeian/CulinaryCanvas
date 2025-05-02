import React from 'react';

import { useGetCategoryQuery } from '~/query/services/get';
import { ComingCategoryData } from '~/types/comingData';

export function useFilteredCategories() {
    const { data } = useGetCategoryQuery();
    const [loading, setLoading] = React.useState(true);
    const [filtered, setFiltered] = React.useState<ComingCategoryData[]>([]);

    React.useEffect(() => {
        if (!data) return;
        const result = data.filter((item: ComingCategoryData) => 'subCategories' in item);
        setFiltered(result);
        setLoading(false);
    }, [data]);
    console.log(filtered);
    return { data: filtered, loading };
}
