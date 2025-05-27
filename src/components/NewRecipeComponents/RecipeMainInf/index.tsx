import { VStack } from '@chakra-ui/react';

import { RecipeFormProps } from '~/types/NewRecipesTypes';

import { CookingTime } from '../cookingTime';
import { PersonCount } from '../personCount';
import { NewRecipeTitle } from '../recipeTitle';
import { SelectCategory } from '../selectCategory';

export const RecipeMainInf = ({ register, errors, setValue }: RecipeFormProps) => (
    <VStack gap='24px' alignItems='flex-start' h='100%' overflowY='scroll'>
        <SelectCategory errors={errors} setValue={setValue} />
        <NewRecipeTitle register={register} errors={errors} />
        <PersonCount errors={errors} setValue={setValue} />
        <CookingTime errors={errors} setValue={setValue} />
    </VStack>
);
