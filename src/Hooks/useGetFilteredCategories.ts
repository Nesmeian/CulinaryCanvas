import { useEffect, useState } from 'react';

import { useGetCategoryQuery } from '~/query/services/get';
import { ComingCategoryData } from '~/types/comingData';

export function useGetFilteredCategories(subCategory?: boolean) {
    const { data, isError } = useGetCategoryQuery();
    const [isLoading, setLoading] = useState(true);
    const [filtered, setFiltered] = useState<ComingCategoryData[]>([]);

    useEffect(() => {
        if (!data || !Array.isArray(data)) {
            setFiltered([]);
            setLoading(false);
            return;
        }

        const result = subCategory
            ? data.filter((item: ComingCategoryData) => !('subCategories' in item))
            : data.filter((item: ComingCategoryData) => 'subCategories' in item);

        setFiltered(result);
        setLoading(false);
    }, [data, subCategory]);

    return { data: filtered, isLoading, isError };
}
