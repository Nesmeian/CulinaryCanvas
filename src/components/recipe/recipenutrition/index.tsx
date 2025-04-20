import { HStack, Stack, Text } from '@chakra-ui/react';

import { NutritionValueData } from '~/types/recipesData';

export default function RecipeNutritionValue({ data }: { data: NutritionValueData }) {
    const rusTranslateOfNutrion = {
        calories: 'калорийность',
        carbohydrates: 'углеводы',
        fats: 'жиры',
        proteins: 'белки',
    };
    const measureOfNutrion = {
        calories: 'ККАЛ',
        carbohydrates: 'ГРАММ',
        fats: 'ГРАММ',
        proteins: 'ГРАММ',
    };
    return (
        <Stack alignItems='flex-start' mt={{ lg: '36px', base: '23px' }} width={{ base: '100%' }}>
            <Text fontSize='14px' mb={{ md: '12px', base: '4px' }}>
                * Калорийность на 1 порцию
            </Text>
            <HStack
                width='100%'
                gap={{ xl: '24px', md: '12px', base: '15px' }}
                flexDirection={{ md: 'row', base: 'column' }}
            >
                {(Object.entries(data) as Array<[keyof NutritionValueData, number]>).map(
                    ([name, value]) => (
                        <HStack
                            flexDirection={{ md: 'column', base: 'row' }}
                            p={{ md: '16px', base: '12px 12px' }}
                            border='1px solid black'
                            borderRadius='16px'
                            width={{ xl: '149px', lg: '135.5px', md: '173px', base: '100%' }}
                            gap='3px'
                        >
                            <Text fontSize='14px' width={{ md: 'auto', base: '117.5px' }}>
                                {rusTranslateOfNutrion[name]}
                            </Text>
                            <Text
                                fontSize={{ md: '36px', base: '24px' }}
                                color='#134B00'
                                fontWeight='500'
                                textAlign='center'
                                width={{ md: 'auto', base: '117.5px' }}
                            >
                                {value}
                            </Text>
                            <Text
                                fontSize='14px'
                                fontWeight='600'
                                width={{ md: 'auto', base: '57px' }}
                                textAlign='start'
                            >
                                {measureOfNutrion[name]}
                            </Text>
                        </HStack>
                    ),
                )}
            </HStack>
        </Stack>
    );
}
