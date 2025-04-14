import './style.css';

import { Button, Grid, Heading, HStack, Text, VStack } from '@chakra-ui/react';

import { BottomSectionProps } from '~/types/dataTypes';
import { TagKey } from '~/types/utilsTypes';
import AddNotifications from '~/utils/addNotifications';
import AddTags from '~/utils/addTags';

export default function BottomSection({ data }: BottomSectionProps) {
    return (
        <VStack
            as='section'
            className='bottom-section'
            alignSelf='flex-start'
            gap={{ xl: '11px', lg: '20px' }}
        >
            <Grid
                alignItems='center'
                width='100%'
                templateColumns={{
                    xl: 'repeat(2, 1fr)',
                    lg: '31.8% 1fr',
                    md: '1fr',
                }}
                gap={{ xl: '32px', lg: '24px', sm: '4px' }}
                className='bottom-section__title-container'
            >
                <Heading as='h2' size='h2' lineHeight='44px' className='bottom-section__title'>
                    {data.title}
                </Heading>
                <Text lineHeight='20px'>{data.description}</Text>
            </Grid>
            <Grid
                templateColumns={{
                    sm: '1fr',
                    md: '2fr 1fr',
                    xl: '1fr 1fr',
                }}
                gap={{ xl: '24px', sm: '12px' }}
                className='bottom-section__lists'
            >
                <Grid
                    gap={{ xl: '25px', sm: '10px' }}
                    templateColumns='repeat(auto-fit, minmax(232px, 1fr)) '
                >
                    {data.elems.smallCard.map(({ id, title, tag, description, notifications }) => (
                        <VStack key={id} className='bottom-section__card-item'>
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
                    {data.elems.recipes.map(({ title, tag }) => (
                        <HStack
                            key={title}
                            className='bottom-section__recipe-item'
                            width='100%'
                            justify='space-between'
                        >
                            <HStack gap='0px' position='relative' width='70%'>
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
                                width='30%'
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
