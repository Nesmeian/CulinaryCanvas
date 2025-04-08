import './style.css';

import { Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';

import veganCuisineCardData from '~/data/veganCuisine/cards';
import veganCuisineRecipesData from '~/data/veganCuisine/recipes';
import { TagKey } from '~/types/utilsTypes';
import AddNotifications from '~/utils/addNotifications';
import AddTags from '~/utils/addTags';

export default function VeganCuisine() {
    return (
        <HStack alignSelf='flex-start' alignItems='flex-start' gap='10px' className='vegan-cuisine'>
            <VStack align='flex-start' width='50%'>
                <Heading as='h2' size='h2' letterSpacing='0.8px' mb='4px'>
                    Веганская кухня
                </Heading>
                <HStack gap='24px'>
                    {veganCuisineCardData.map(({ title, tag, description, notifications }) => (
                        <VStack key={title} className='vegan-cuisine__card-item'>
                            <Heading width='100%' noOfLines={1} as='h4' size='h4'>
                                {title}
                            </Heading>
                            <Text variant='culinaryTextStyles' mb='18px' noOfLines={3}>
                                {description}
                            </Text>
                            <HStack width='100%' justify='space-between'>
                                <AddTags
                                    tag={tag as TagKey}
                                    withText
                                    size='14px'
                                    color='#ffffd3;'
                                />
                                <AddNotifications notifications={notifications} />
                            </HStack>
                        </VStack>
                    ))}
                </HStack>
            </VStack>
            <VStack width='50%' height='100%' className='vegan-cuisine__recipe'>
                <Text className='vegan-cuisine__recipe-title'>
                    Интересны не только убеждённым вегетарианцам, но и тем, кто хочет попробовать
                    вегетарианскую диету и готовить вкусные вегетарианские блюда.
                </Text>
                <VStack width='100%' gap='12px'>
                    {veganCuisineRecipesData.map(({ title, tag }) => (
                        <HStack key={title} className='vegan-cuisine__recipe-item'>
                            <HStack width='100%' gap='0px'>
                                <AddTags tag={tag as TagKey} withText={false} size='24px' />
                                <Heading as='h4' size='h4'>
                                    {title}
                                </Heading>
                            </HStack>
                            <Button
                                width='95px'
                                fontSize='15.5px'
                                fontWeight='600'
                                height='32px'
                                variant='outline'
                                colorScheme='customGreen'
                            >
                                Готовить
                            </Button>
                        </HStack>
                    ))}
                </VStack>
            </VStack>
        </HStack>
    );
}
