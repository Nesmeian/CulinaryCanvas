import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';

import { useGetCategoryIdQuery, useGetRecipesByCategoryQuery } from '~/query/services/get';
import { SubCategoriesProps } from '~/types/comingData';

export const useGetSubcategoryRecipesData = (data: SubCategoriesProps[]) => {
    const randomCategory = useMemo<SubCategoriesProps | undefined>(() => {
        if (!data.length) return undefined;
        const idx = Math.floor(Math.random() * data.length);
        return data[idx];
    }, [data]);
    const {
        data: categoryData,
        isLoading: isCategoryLoading,
        isError: isErrorCategory,
    } = useGetCategoryIdQuery(randomCategory?.rootCategoryId ?? skipToken);

    const {
        data: recipes,
        isLoading: isRecipesLoading,
        isError: isErrorRecipe,
    } = useGetRecipesByCategoryQuery(
        { limit: 5, id: randomCategory?._id },
        { skip: !randomCategory?._id },
    );

    const isLoading = isCategoryLoading || isRecipesLoading;
    const isError = isErrorCategory || isErrorRecipe;
    return { categoryData, recipes, isLoading, isError };
};
