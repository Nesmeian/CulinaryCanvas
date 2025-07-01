import { Text } from '@chakra-ui/react';

import { newRecipesCountStl } from './style';

export const NewRecipeCount = ({ newRecipesCount }: { newRecipesCount: number }) => (
    <>
        {newRecipesCount !== 0 && (
            <Text {...newRecipesCountStl}>{`${newRecipesCount} новый рецепт`}</Text>
        )}
    </>
);
