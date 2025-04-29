import { HStack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { IngredientsDataProps } from '~/types/recipesData';
import StepperInput from '~/utils/stepperInput';
export default function RecipeIngredients({ data, recipePortions }: IngredientsDataProps) {
    const [portions, setPortions] = useState(recipePortions);

    return (
        <VStack
            width={{ lg: '100%', base: '100%' }}
            mt={{ lg: '40px', md: '23px', base: '25px' }}
            gap='0'
        >
            <HStack
                justifyContent='space-between'
                w='100%'
                pl={{ md: '24px', base: '6px' }}
                mb={{ md: '7px', base: '8px' }}
            >
                <Text fontSize='12px' color='#2DB100' fontWeight='700' letterSpacing='1px'>
                    ИНГРЕДИЕНТЫ
                </Text>
                <HStack>
                    <Text fontSize='12px' color='#2DB100' fontWeight='700' letterSpacing='1px'>
                        ПОРЦИЙ
                    </Text>
                    <StepperInput count={portions} setCount={setPortions} />
                </HStack>
            </HStack>
            {data.map(({ count, measureUnit, title }, i) => (
                <HStack
                    key={title}
                    width='100%'
                    justifyContent='space-between'
                    background={i % 2 === 0 ? 'rgba(0, 0, 0, 0.06)' : 'white'}
                    p={{ lg: '15.5px 24px', md: '9.5px 24px', base: '9.5px 6px' }}
                >
                    <Text fontSize='14px' fontWeight='500'>
                        {title}
                    </Text>
                    <Text fontSize='14px' data-test-id={`ingredient-quantity-${i}`}>
                        {`${Math.round(Number(count) * portions)} ${measureUnit}`}
                    </Text>
                </HStack>
            ))}
        </VStack>
    );
}
