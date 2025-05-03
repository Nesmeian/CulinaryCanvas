import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';

import { useGetCategoryIdQuery, useGetRecipesQuery } from '~/query/services/get';
import { SubCategoriesProps } from '~/types/comingData';

export const useGetSubcategoryRecipesData = (data: SubCategoriesProps[]) => {
    const randomCategory = useMemo<SubCategoriesProps | undefined>(() => {
        if (!data.length) return undefined;
        const idx = Math.floor(Math.random() * data.length);
        return data[idx];
    }, [data]);
    const { data: categoryData } = useGetCategoryIdQuery(
        randomCategory?.rootCategoryId ?? skipToken,
    );
    const { data: recipes, isLoading } = useGetRecipesQuery(randomCategory?._id ?? skipToken);

    return { categoryData, recipes, isLoading };
};
