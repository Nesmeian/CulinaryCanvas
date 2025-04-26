import { VStack } from '@chakra-ui/react';

import useBreakpoints from '~/themes/chakraBreakPoints';
import { AuthorData, NutritionValueData, RecipeData } from '~/types/recipesData/index.ts';

import DB from '../../data/db.json';
import Footer from '../Footer';
import Slider from '../slider';
import MainStyled from '../styledComponents/Main';
import RecipeAuthor from './recipeAuthor';
import RecipeCard from './recipeCard';
import RecipeIngredients from './recipeIngredients';
import RecipeNutritionValue from './recipenutrition';
import RecipeSteps from './recipeSteps';
export default function Recipe({ card }: { card: string }) {
    const { isTablet } = useBreakpoints();
    const recipeItem = DB.card.find(({ imgUrl }) => card === imgUrl);
    const [
        recipeNutritionValueData,
        recipeIngredientsData,
        recipeStepsData,
        recipeAuthorData,
        recipePortions,
    ] = [
        recipeItem?.nutritionValue,
        recipeItem?.ingredients,
        recipeItem?.steps,
        recipeItem?.author,
        recipeItem?.portions ?? 1,
    ];

    if (!recipeIngredientsData || !recipeStepsData) {
        return <div>Ошибка: ингредиенты не указаны</div>;
    }
    return (
        <MainStyled
            as='main'
            pl={{ lg: '14px', md: '20px', sm: '16px' }}
            gap={0}
            overflowY='scroll'
        >
            <RecipeCard recipeData={recipeItem as RecipeData} />
            <VStack
                as='section'
                width={{ xl: '49%', lg: '66%', md: '83%', base: '100%' }}
                mb='18px'
            >
                <RecipeNutritionValue data={recipeNutritionValueData as NutritionValueData} />
                <RecipeIngredients data={recipeIngredientsData} recipePortions={recipePortions} />
                <RecipeSteps data={recipeStepsData} />
                <RecipeAuthor data={recipeAuthorData as AuthorData} />
            </VStack>
            <Slider isRecipePage />
            {isTablet && <Footer />}
        </MainStyled>
    );
}
