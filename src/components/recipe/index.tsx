import { RecipeData } from '~/types/recipesData/index.ts';

import DB from '../../data/db.json';
import MainStyled from '../styledComponents/Main';
import RecipeCard from './recipeCard.tsx';
export default function Recipe({ recipe }: { recipe: string }) {
    const recipeItem = DB.recipes.find(({ path }) => recipe === path);
    if (!recipeItem) {
        return <div>Рецепт не найден</div>;
    }
    return (
        <MainStyled as='main' pl={{ lg: '14px', md: '20px', sm: '16px' }}>
            <RecipeCard recipeData={recipeItem as RecipeData} />
        </MainStyled>
    );
}
