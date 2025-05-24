import { VStack } from '@chakra-ui/react';

import { IngredientsBlock } from '../IngredientsBlock';

export const RecipeBuilder = () => (
    <VStack w={{ lg: '658px', md: '604px', base: '328px' }} mt={{ base: '44px' }}>
        <IngredientsBlock />
    </VStack>
);
