import { Heading, HStack } from '@chakra-ui/react';

import { NumberInput } from '~/components/NumberInput';
import { RecipeFormHelpers } from '~/types/NewRecipesTypes';

import { newRecipeHeadingStyle } from '../componentStyles';

export const PersonCount = ({ errors, setValue }: RecipeFormHelpers) => (
    <HStack gap='24px'>
        <Heading {...newRecipeHeadingStyle}>На сколько человек ваш рецепт?</Heading>
        <NumberInput value={4} name='portions' errors={errors} setValue={setValue} />
    </HStack>
);
