import { VStack } from '@chakra-ui/react';

import { NutritionValueData, RecipeData } from '~/types/recipesData/index.ts';

import DB from '../../data/db.json';
import MainStyled from '../styledComponents/Main';
import RecipeCard from './recipeCard';
import RecipeIngredients from './recipeIngredients';
import RecipeNutritionValue from './recipenutrition';
export default function Recipe({ recipe }: { recipe: string }) {
    const recipeItem = DB.recipes.find(({ path }) => recipe === path);
    const recipeNutritionValueData = recipeItem?.nutritionValue;
    const recipeIngredientsData = recipeItem?.ingredients;
    if (!recipeIngredientsData) {
        return <div>Ошибка: ингредиенты не указаны</div>;
    }
    return (
        <MainStyled as='main' pl={{ lg: '14px', md: '20px', sm: '16px' }} gap={0}>
            <RecipeCard recipeData={recipeItem as RecipeData} />
            <VStack>
                <RecipeNutritionValue data={recipeNutritionValueData as NutritionValueData} />
                <RecipeIngredients data={recipeIngredientsData} />
            </VStack>
        </MainStyled>
    );
}
