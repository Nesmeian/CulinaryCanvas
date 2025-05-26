import { Button, VStack } from '@chakra-ui/react';

import { IngredientsBlock } from '../IngredientsBlock';
import { RecipeStepsBlock } from '../recipeStepsBlock';

export const RecipeBuilder = () => (
    <VStack w={{ lg: '658px', md: '604px', base: '328px' }} mt={{ base: '44px' }}>
        <IngredientsBlock />
        <RecipeStepsBlock />
        <Button type='submit' variant='commonLoginBtn'>
            Опубликовать рецепт
        </Button>
    </VStack>
);
