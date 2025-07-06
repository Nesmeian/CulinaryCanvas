import { Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';

import { StepsDataProps } from '~/types/recipesData';

import * as recipeSteps from '../../../assets/recipes/steps/index';
export default function RecipeSteps({ data }: StepsDataProps) {
    return (
        <VStack width='100%' alignItems='flex-start' mt={{ lg: '16px', base: '14px' }}>
            <Heading
                as='h2'
                size='h2'
                letterSpacing='1px'
                fontSize={{ lg: '48px', base: '24px' }}
                mb={{ lg: '5px', base: '10px' }}
            >
                Шаги приготовления
            </Heading>
            <VStack gap={{ base: '19.5px' }}>
                {data.map(({ stepNumber, image, description }) => (
                    <HStack
                        key={stepNumber}
                        direction={{ base: 'column' }}
                        w='100%'
                        height={image ? { lg: '244px', base: '128px' } : 'auto'}
                        gap={0}
                        border=' 1px solid rgba(0, 0, 0, 0.08)'
                        borderRadius='8px'
                        overflow='hidden'
                    >
                        {image && (
                            <Image
                                height={{ lg: 'auto', base: '100%' }}
                                w={{ lg: '346px', base: '158px' }}
                                src={recipeSteps[image as keyof typeof recipeSteps]}
                            />
                        )}
                        <HStack
                            width='100%'
                            h='100%'
                            align='flex-start'
                            p={{ lg: '20px 24px', base: '8px' }}
                        >
                            <VStack alignItems='flex-start' gap={{ lg: '14px', base: '10px' }}>
                                <Text
                                    p='2px 8px'
                                    borderRadius='4px'
                                    background='rgba(0, 0, 0, 0.06)'
                                    fontSize={{ base: '14px' }}
                                    letterSpacing='0.5px'
                                    lineHeight='20px'
                                >{`Шаг ${stepNumber}`}</Text>
                                <Text fontSize={{ base: '14px' }} letterSpacing='0.5px'>
                                    {description}
                                </Text>
                            </VStack>
                        </HStack>
                    </HStack>
                ))}
            </VStack>
        </VStack>
    );
}
