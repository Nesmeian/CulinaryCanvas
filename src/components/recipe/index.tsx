import { VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { useGetRecipeByIdQuery } from '~/query/services/get';
import { NutritionValueData } from '~/types/recipesData/index.ts';
import GetCurrentPath from '~/utils/getCurrentPath';

import { Loader } from '../loader';
import Slider from '../slider';
import MainStyled from '../styledComponents/Main';
import RecipeAuthor from './recipeAuthor';
import RecipeCard from './recipeCard';
import RecipeIngredients from './recipeIngredients';
import RecipeNutritionValue from './recipenutrition';
import RecipeSteps from './recipeSteps';

export default function Recipe() {
    const path = GetCurrentPath();
    const navigate = useNavigate();
    const { data: recipeItem, isLoading, isError } = useGetRecipeByIdQuery(path[path.length - 1]);
    if (isLoading) {
        return <Loader />;
    }
    if (isError) {
        navigate('/not-found', { replace: true });
    }

    const recipeNutritionValueData = recipeItem?.nutritionValue;
    const recipeIngredientsData = recipeItem?.ingredients ?? [];
    const recipeStepsData = recipeItem?.steps ?? [];
    const recipePortions = recipeItem?.portions ?? 1;
    const author = {
        name: 'Сергей Разумов',
        email: '@serge25',
        imgUrl: 'sergeyRazumov',
        notifications: {
            views: 125,
        },
    };
    return (
        <MainStyled
            as='main'
            pl={{ lg: '14px', md: '20px', sm: '16px' }}
            gap={0}
            overflowY='scroll'
        >
            {recipeItem && <RecipeCard recipeData={recipeItem} />}
            <VStack
                as='section'
                width={{ xl: '49%', lg: '66%', md: '83%', base: '100%' }}
                mb='18px'
            >
                <RecipeNutritionValue data={recipeNutritionValueData as NutritionValueData} />
                <RecipeIngredients data={recipeIngredientsData} recipePortions={recipePortions} />
                <RecipeSteps data={recipeStepsData} />
                <RecipeAuthor data={author} />
            </VStack>
            <Slider isRecipePage />
        </MainStyled>
    );
}
