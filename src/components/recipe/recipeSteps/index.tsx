import { Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';

import { IMG_PATH } from '~/shared/config/api';
import { StepsData } from '~/types/recipesData';

import { stepTextStyle } from '../recipeStyles';
export default function RecipeSteps({ data }: { data: StepsData[] }) {
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
                                src={`${IMG_PATH}${image}`}
                            />
                        )}
                        <HStack
                            width='100%'
                            h='100%'
                            align='flex-start'
                            p={{ lg: '20px 24px', base: '8px' }}
                        >
                            <VStack alignItems='flex-start' gap={{ lg: '14px', base: '10px' }}>
                                <Text {...stepTextStyle}>{`Шаг ${stepNumber}`}</Text>
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
