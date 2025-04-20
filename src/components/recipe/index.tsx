import { NutritionValueData, RecipeData } from '~/types/recipesData/index.ts';

import DB from '../../data/db.json';
import MainStyled from '../styledComponents/Main';
import RecipeCard from './recipeCard';
import RecipeNutritionValue from './recipenutrition';
export default function Recipe({ recipe }: { recipe: string }) {
    const recipeItem = DB.recipes.find(({ path }) => recipe === path);
    const recipenutritionValueData = recipeItem?.nutritionValue;
    if (!recipeItem) {
        return <div>Рецепт не найден</div>;
    }
    return (
        <MainStyled as='main' pl={{ lg: '14px', md: '20px', sm: '16px' }} gap={0}>
            <RecipeCard recipeData={recipeItem as RecipeData} />
            <RecipeNutritionValue data={recipenutritionValueData as NutritionValueData} />
        </MainStyled>
    );
}
