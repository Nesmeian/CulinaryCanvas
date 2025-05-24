import { Heading, HStack } from '@chakra-ui/react';

import { NumberInput } from '~/components/NumberInput';

import { newRecipeHeadingStyle } from '../componentStyles';

export const CookingTime = () => (
    <HStack gap='24px'>
        <Heading {...newRecipeHeadingStyle}>Сколько времени готовить в минутах?</Heading>
        <NumberInput defaultValue={30} />
    </HStack>
);
