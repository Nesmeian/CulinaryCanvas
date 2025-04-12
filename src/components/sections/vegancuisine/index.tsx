import './style.css';

import { Button, Grid, Heading, HStack, Text, VStack } from '@chakra-ui/react';

import DB from '~/data/db.json';
import { TagKey } from '~/types/utilsTypes';
import AddNotifications from '~/utils/addNotifications';
import AddTags from '~/utils/addTags';

export default function VeganCuisine() {
    return (
        <VStack className='vegan-cuisine' alignSelf='flex-start' gap={{ xl: '11px', lg: '20px' }}>
            <Grid
                alignItems='center'
                width='100%'
                templateColumns={{
                    xl: 'repeat(2, 1fr)',
                    lg: '31.8% 1fr',
                    md: '1fr',
                }}
                gap={{ xl: '32px', lg: '24px', sm: '4px' }}
                className='vegan-cuisine__title-container'
            >
                <Heading as='h2' size='h2' lineHeight='44px' className='vegan-cuisine__title'>
                    Веганская кухня
                </Heading>
                <Text lineHeight='20px'>
                    Интересны не только убеждённым вегетарианцам, но и тем, кто хочет попробовать
                    вегетарианскую диету и готовить вкусные вегетарианские блюда.
                </Text>
            </Grid>
            <Grid
                templateColumns={{
                    sm: '1fr',
                    md: '2fr 1fr',
                    xl: '1fr 1fr',
                }}
                gap={{ xl: '24px', sm: '12px' }}
                className='vegan-cuisine__lists'
            >
                <Grid
                    gap={{ xl: '25px', sm: '10px' }}
                    templateColumns='repeat(auto-fit, minmax(232px, 1fr)) '
                >
                    {DB.veganCuisine.card.map(({ id, title, tag, description, notifications }) => (
                        <VStack key={id} className='vegan-cuisine__card-item'>
                            <Heading
                                variant='veganCardHeadingStyles'
                                width='100%'
                                as='h4'
                                size='h4'
                            >
                                {title}
                            </Heading>
                            <Text variant='culinaryTextStyles' mb='18px' noOfLines={3}>
                                {description}
                            </Text>
                            <HStack width='100%' justify='space-between' position='relative'>
                                <AddTags
                                    tag={tag as TagKey}
                                    withText
                                    size='14px'
                                    color='#ffffd3;'
                                    newPosition
                                />
                                <AddNotifications notifications={notifications} />
                            </HStack>
                        </VStack>
                    ))}
                </Grid>
                <VStack gap={{ lg: '12px', md: '8px', sm: '15px' }} width='100%'>
                    {DB.veganCuisine.recipes.map(({ title, tag }) => (
                        <HStack
                            key={title}
                            className='vegan-cuisine__recipe-item'
                            width='100%'
                            justify='space-between'
                        >
                            <HStack gap='0px' position='relative'>
                                <AddTags
                                    tag={tag as TagKey}
                                    newPosition
                                    withText={false}
                                    size='24px'
                                />
                                <Heading
                                    variant='veganItemHeadingStyles'
                                    noOfLines={1}
                                    as='h4'
                                    size='h4'
                                >
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
            </Grid>
        </VStack>
    );
}
