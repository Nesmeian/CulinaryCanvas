import { VStack } from '@chakra-ui/react';

import { NutritionValueData, RecipeData } from '~/types/recipesData/index.ts';

import DB from '../../data/db.json';
import MainStyled from '../styledComponents/Main';
import RecipeCard from './recipeCard';
import RecipeIngredients from './recipeIngredients';
import RecipeNutritionValue from './recipenutrition';
import RecipeSteps from './recipeSteps';
export default function Recipe({ recipe }: { recipe: string }) {
    const recipeItem = DB.recipes.find(({ path }) => recipe === path);
    const recipeNutritionValueData = recipeItem?.nutritionValue;
    const recipeIngredientsData = recipeItem?.ingredients;
    const recipeStepsData = recipeItem?.steps;
    if (!recipeIngredientsData || !recipeStepsData) {
        return <div>Ошибка: ингредиенты не указаны</div>;
    }
    return (
        <MainStyled as='main' pl={{ lg: '14px', md: '20px', sm: '16px' }} gap={0} overflow='unset'>
            <RecipeCard recipeData={recipeItem as RecipeData} />
            <VStack as='section' width={{ xl: '49%', lg: '66%', md: '83%', base: '100%' }}>
                <RecipeNutritionValue data={recipeNutritionValueData as NutritionValueData} />
                <RecipeIngredients data={recipeIngredientsData} />
                <RecipeSteps data={recipeStepsData} />
            </VStack>
        </MainStyled>
    );
}
