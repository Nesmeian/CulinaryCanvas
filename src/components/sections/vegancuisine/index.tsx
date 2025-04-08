import './style.css';

import { Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';

import veganCuisineCardData from '~/data/veganCuisine/cards';
import veganCuisineRecipesData from '~/data/veganCuisine/recipes';
import { TagKey } from '~/types/utilsTypes';
import AddNotifications from '~/utils/addNotifications';
import AddTags from '~/utils/addTags';

export default function VeganCuisine() {
    return (
        <HStack
            width='94.7%'
            alignSelf='flex-start'
            ml='8px'
            pt='10px'
            gap='10px'
            borderTop='1px solid rgba(0, 0, 0, 0.08);'
        >
            <VStack align='flex-start' width='50%'>
                <Heading as='h2' size='h2' letterSpacing='0.8px' mb='4px'>
                    Веганская кухня
                </Heading>
                <HStack gap='24px'>
                    {veganCuisineCardData.map(({ title, tag, description, notifications }) => (
                        <VStack className='vegan-cuisine__card-item'>
                            <Heading width='100%' noOfLines={1} as='h4' size='h4'>
                                {title}
                            </Heading>
                            <Text variant='culinaryTextStyles' mb='23px' noOfLines={3}>
                                {description}
                            </Text>
                            <HStack width='100%' justify='space-between'>
                                <AddTags tag={tag as TagKey} withText />
                                <AddNotifications notifications={notifications} />
                            </HStack>
                        </VStack>
                    ))}
                </HStack>
            </VStack>
            <VStack width='50%'>
                <Text>
                    Интересны не только убеждённым вегетарианцам, но и тем, кто хочет попробовать
                    вегетарианскую диету и готовить вкусные вегетарианские блюда.
                </Text>
                <VStack>
                    {veganCuisineRecipesData.map(({ title, tag }) => (
                        <HStack>
                            <HStack>
                                <AddTags tag={tag as TagKey} withText={false} />
                                <Heading as='h4' size='h4'>
                                    {title}
                                </Heading>
                            </HStack>
                            <Button variant='plain'>Готовить</Button>
                        </HStack>
                    ))}
                </VStack>
            </VStack>
        </HStack>
    );
}
