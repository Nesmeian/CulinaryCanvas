import { Heading, VStack } from '@chakra-ui/react';

import { newRecipeHeadingStyle } from '../componentStyles';
import { StepsList } from './StepsList';
export const RecipeStepsBlock = () => (
    <VStack w='100%'>
        <Heading as='h3' {...newRecipeHeadingStyle} alignSelf='flex-start'>
            Добавьте шаги приготовления
        </Heading>
        <StepsList />
    </VStack>
);
