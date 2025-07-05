import { Text } from '@chakra-ui/react';

import { declOfNum } from '../../utils/declOfNum';
import { newRecipesCountStl } from './style';

export const NewRecipeCount = ({ newRecipesCount }: { newRecipesCount: number }) => (
    <>
        {newRecipesCount !== 0 && <Text {...newRecipesCountStl}>{declOfNum(newRecipesCount)}</Text>}
    </>
);
