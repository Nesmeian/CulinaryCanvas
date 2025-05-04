import { Text } from '@chakra-ui/react';

import { useGetFilteredCategories } from '~/Hooks/useGetFilteredCategories';
import { useGetRecipeByIdQuery } from '~/query/services/get';

import DB from '../../data/db.json';
export default function TranslatePathSegment({ segment }: { segment: string }) {
    const { data: recipeData } = useGetRecipeByIdQuery(segment);
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
    const juiciest = { 'the-juiciest': 'Самое сочное' } as Record<string, string>;
    const recipeKey =
        recipeData?._id && recipeData?.title ? { [recipeData._id]: recipeData.title } : {};
    const mergedTranslations = {
        ...subcategories,
        ...categories,
        ...dishes,
        ...juiciest,
        ...recipeKey,
    };
    return <Text>{mergedTranslations[segment] || segment}</Text>;
}
