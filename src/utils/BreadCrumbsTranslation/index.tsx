import { Text } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';

import { useGetFilteredCategories } from '~/Hooks/useGetFilteredCategories';
import { useGetRecipeByIdQuery } from '~/query/services/get';

import DB from '../../data/db.json';
import { isObjectId } from '../isObjectId.ts';
export default function TranslatePathSegment({ segment }: { segment: string }) {
    const shouldFetchRecipe = isObjectId(segment);
    const { data: recipeData } = useGetRecipeByIdQuery(shouldFetchRecipe ? segment : skipToken);
    const { data: categoriesData } = useGetFilteredCategories();
    const { data: subCategoriesData } = useGetFilteredCategories(true);
    const subcategories = subCategoriesData.reduce(
        (acc, { category, title }) => {
            acc[category] = title;
            return acc;
        },
        {} as Record<string, string>,
    );
    const categories = categoriesData.reduce(
        (acc, { category, title }) => {
            acc[category] = title;
            return acc;
        },
        {} as Record<string, string>,
    );
    const dishes = DB.card.reduce(
        (acc, { id, title }) => {
            acc[id] = title;
            return acc;
        },
        {} as Record<string, string>,
    );
    const newRecipe = { 'new-recipe': 'Новый рецепт' };
    const pages = {
        'new-recipe': 'Новый рецепт',
        'the-juiciest': 'Самое сочное',
        'not-found': 'Страница не найдена',
        blogs: 'Блоги',
    };
    const recipeKey =
        recipeData?._id && recipeData?.title ? { [recipeData._id]: recipeData.title } : {};
    const mergedTranslations: Record<string, string> = {
        ...newRecipe,
        ...subcategories,
        ...categories,
        ...dishes,
        ...recipeKey,
        ...pages,
    };
    return <Text>{mergedTranslations[segment] || segment}</Text>;
}
