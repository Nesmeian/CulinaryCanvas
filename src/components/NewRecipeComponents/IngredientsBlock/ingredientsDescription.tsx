import { HStack, Text } from '@chakra-ui/react';

import { IngredientsDescriptionStyles } from '../componentStyles';

export const IngredientsDescription = () => (
    <HStack gap='12px'>
        <Text {...IngredientsDescriptionStyles} w={{ lg: '295px', md: '241px', base: '328px' }}>
            Ингредиент
        </Text>
        <Text {...IngredientsDescriptionStyles} w={{ base: '80px' }}>
            Количество
        </Text>
        <Text {...IngredientsDescriptionStyles} w={{ md: '215px', base: '192px' }}>
            Единица измерения
        </Text>
    </HStack>
);
