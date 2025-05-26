import { Heading, HStack } from '@chakra-ui/react';

import { NumberInput } from '~/components/NumberInput';
import { RecipeFormHelpers } from '~/types/NewRecipesTypes';

import { newRecipeHeadingStyle } from '../componentStyles';

export const CookingTime = ({ errors, setValue }: RecipeFormHelpers) => (
    <HStack gap='24px'>
        <Heading {...newRecipeHeadingStyle}>Сколько времени готовить в минутах?</Heading>
        <NumberInput name='time' setValue={setValue} errors={errors} value={30} />
    </HStack>
);
