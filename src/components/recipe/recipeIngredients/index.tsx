import { HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { IngredientsDataProps } from '~/types/recipesData';
import StepperInput from '~/utils/stepperInput';
export default function RecipeIngredients({ data, recipePortions }: IngredientsDataProps) {
    const [portions, setPortions] = useState(recipePortions);
    useEffect(() => {
        setPortions(recipePortions);
    }, [recipePortions]);

    const factor = portions / recipePortions;

    return (
        <VStack width='100%' mt='40px' gap='0'>
            <HStack justifyContent='space-between' w='100%' mb='8px'>
                <Text fontSize='12px' color='#2DB100' fontWeight='700'>
                    ИНГРЕДИЕНТЫ
                </Text>
                <HStack>
                    <Text fontSize='12px' color='#2DB100' fontWeight='700'>
                        ПОРЦИЙ
                    </Text>
                    <StepperInput count={portions} setCount={setPortions} />
                </HStack>
            </HStack>

            {data.map(({ count, measureUnit, title }, i) => {
                const base = parseFloat(count) || 0;
                const scaled = (base * factor).toFixed(2);
                return (
                    <HStack
                        key={title}
                        width='100%'
                        justifyContent='space-between'
                        background={i % 2 === 0 ? 'rgba(0,0,0,0.06)' : 'white'}
                        p='9.5px 24px'
                    >
                        <Text fontSize='14px' fontWeight='500'>
                            {title}
                        </Text>
                        <Text fontSize='14px' data-test-id={`ingredient-quantity-${i}`}>
                            {scaled} {measureUnit}
                        </Text>
                    </HStack>
                );
            })}
        </VStack>
    );
}
