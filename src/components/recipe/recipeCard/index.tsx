import { Button, ButtonGroup, Heading, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react';

import { RecipeData } from '~/types/recipesData';
import { TagKey } from '~/types/utilsTypes';
import AddNotifications from '~/utils/addNotifications';
import AddTags from '~/utils/addTags';

import alarmImg from '../../../assets/alarm.svg';
import * as recipesDishesImg from '../../../assets/recipeImages/index';
import * as socialIcons from '../../../assets/socialIcons/index';

export default function RecipeCard({ recipeData }: { recipeData: RecipeData }) {
    const { title, id, description, category, imgUrl, bookmarks, likes, time } = recipeData;
    return (
        <Stack
            as='section'
            flexDir={{ md: 'row', sm: 'column' }}
            mt={{ lg: '56px', sm: '4px' }}
            width='100%'
            key={id}
            position='relative'
            _hover={{
                boxShadow:
                    '0 2px 4px -1px rgba(32, 126, 0, 0.06), 0 4px 6px -1px rgba(32, 126, 0, 0.1)',
            }}
            gap={{ lg: '24px', md: '10px' }}
        >
            <HStack
                minWidth={{ xl: '553px', lg: '353px', md: '232px', base: '328px' }}
                overflow='hidden'
                borderRadius='8px'
            >
                <Image
                    height='100%'
                    width='100%'
                    src={recipesDishesImg[imgUrl as keyof typeof recipesDishesImg]}
                    alt={imgUrl}
                />
            </HStack>
            <VStack
                alignSelf='flex-start'
                height={{ lg: '410px', md: 'auto' }}
                align='flex-start'
                rowGap='10px'
                justify='space-between'
            >
                <VStack w='100%' alignItems='flex-start'>
                    <Stack
                        justify='space-between'
                        width='100%'
                        direction='row'
                        mb={{ lg: '28px', md: '14px', base: '26px' }}
                        pr='8px'
                        alignItems='flex-start'
                    >
                        <AddTags
                            tag={category as TagKey[]}
                            withText={true}
                            color='#ffffd3'
                            size='16px'
                            newPosition
                        />
                        <AddNotifications isRecipe bookmarks={bookmarks} likes={likes} />
                    </Stack>
                    <VStack
                        w={{ xl: '70%', sm: '100%' }}
                        gap={{ lg: '28px', md: '10px', base: '16px' }}
                        mb={{ lg: '10px', sm: '15px' }}
                        alignItems='fl'
                    >
                        <Heading
                            noOfLines={2}
                            as='h1'
                            size='h1'
                            lineHeight={{ md: '48px', base: '32px' }}
                        >
                            {title}
                        </Heading>
                        <Text lineHeight='20px' fontSize='14px' noOfLines={3}>
                            {description}
                        </Text>
                    </VStack>
                </VStack>
                <HStack
                    w='100%'
                    alignItems='flex-end'
                    justifyContent='space-between'
                    flexWrap='wrap'
                    gap={{ md: '0', base: '16px' }}
                >
                    <HStack background='rgba(0, 0, 0, 0.06)' borderRadius='4px' pl='10px' pr='24px'>
                        <Image src={alarmImg} alt='alarm image' />
                        <Text whiteSpace='nowrap' fontSize='14px'>
                            {time}
                        </Text>
                    </HStack>
                    <ButtonGroup gap={{ xl: '10px', md: '4px' }}>
                        <Button
                            fontSize={{ xl: '18px', lg: '14', sm: '12px' }}
                            letterSpacing='0.5px'
                            className='card__btn-save'
                            border='1px solid rgba(0, 0, 0, 0.48)'
                            backgroundColor='white'
                            p={{ xl: '14px 24px', lg: '0 12px', sm: '0 6px' }}
                            size={{
                                base: 'xs',
                                lg: 'sm',
                                xl: 'xl',
                            }}
                            leftIcon={
                                <Image
                                    boxSize={{ xl: '16px', lg: '14px', sm: '12px' }}
                                    src={socialIcons.likes}
                                    alt='likes img'
                                />
                            }
                        >
                            Оценить рецепт
                        </Button>
                        <Button
                            fontSize={{ xl: '18px', lg: '14px', sm: '12px' }}
                            letterSpacing='0.5px'
                            p={{ xl: '14px 24px', lg: '0 12px', sm: '0 6px' }}
                            className='card__btn-cook'
                            background='#B1FF2E'
                            leftIcon={
                                <Image
                                    boxSize={{ xl: '16px', lg: '14px', sm: '12px' }}
                                    src={socialIcons.shares}
                                    alt='shares image'
                                />
                            }
                            size={{
                                base: 'xs',
                                lg: 'sm',
                                xl: 'xl',
                            }}
                        >
                            Сохранить в закладки
                        </Button>
                    </ButtonGroup>
                </HStack>
            </VStack>
        </Stack>
    );
}
