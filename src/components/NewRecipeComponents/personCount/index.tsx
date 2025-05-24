import { Heading, HStack } from '@chakra-ui/react';

import { NumberInput } from '~/components/NumberInput';

import { newRecipeHeadingStyle } from '../componentStyles';

export const PersonCount = () => (
    <HStack gap='24px'>
        <Heading {...newRecipeHeadingStyle}>На сколько человек ваш рецепт?</Heading>
        <NumberInput defaultValue={4} />
    </HStack>
);
