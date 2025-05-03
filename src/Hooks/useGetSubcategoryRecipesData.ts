import { skipToken } from '@reduxjs/toolkit/query';

import { useGetCategoryIdQuery, useGetRecipesQuery } from '~/query/services/get';
import { SubCategoriesProps } from '~/types/comingData';

export const UseGetSubcategoryRecipesData = (data: SubCategoriesProps[]) => {
    const randomIndex = data?.length ? Math.floor(Math.random() * data.length) : undefined;
    const randomCategory = randomIndex !== undefined ? data[randomIndex] : undefined;
    const { data: categoryData } = useGetCategoryIdQuery(
        randomCategory?.rootCategoryId ?? skipToken,
    );
    const { data: recipes, isLoading } = useGetRecipesQuery(randomCategory?._id ?? skipToken);
    console.log(categoryData);
    return { categoryData, recipes, isLoading };
};
