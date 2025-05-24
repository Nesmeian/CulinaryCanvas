import { VStack } from '@chakra-ui/react';

import { CookingTime } from '../cookingTime';
import { PersonCount } from '../personCount';
import { NewRecipeTitle } from '../recipeTitle';
import { SelectCategory } from '../selectCategory';

export const RecipeMainInf = () => (
    <VStack gap='24px' alignItems='flex-start' h='100%' overflowY='scroll'>
        <SelectCategory />
        <NewRecipeTitle />
        <PersonCount />
        <CookingTime />
    </VStack>
);
