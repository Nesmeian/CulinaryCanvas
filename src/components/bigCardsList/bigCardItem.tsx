import { Button, ButtonGroup, Heading, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react';
import { memo } from 'react';
import { Link } from 'react-router';

import { IMG_PATH } from '~/constants';
import { TEST_IDS } from '~/constants/testsIds';
import useBreakpoints from '~/themes/chakraBreakPoints';
import { ComingRecipeData } from '~/types/comingData';
import AddNotifications from '~/utils/addNotifications';
import AddTags from '~/utils/addTags';
import { renderColoredHeading } from '~/utils/coloriseText';

import * as socialIcons from '../../assets/socialIcons/index';
export const BigCardItem = memo(
    ({ recipe, i, searchStr }: { recipe: ComingRecipeData; i: number; searchStr: number }) => {
        const { _id, image, title, description, categoriesIds, bookmarks, likes } = recipe;
        const { isTablet } = useBreakpoints();

        return (
            <HStack
                data-test-id={`${TEST_IDS.FOOD_CARD}${i}`}
                className='card__item'
                position='relative'
                _hover={{
                    boxShadow:
                        '0 2px 4px -1px rgba(32, 126, 0, 0.06), 0 4px 6px -1px rgba(32, 126, 0, 0.1)',
                }}
            >
                <VStack className='card__item__image-container'>
                    <Image height='100%' width='100%' src={`${IMG_PATH}${image}`} />
                </VStack>
                <VStack
                    className='card__item-content'
                    align='flex-start'
                    gap='24px'
                    justify='space-between'
                >
                    <Stack
                        justify='space-between'
                        width='100%'
                        direction={{ lg: 'row', sm: 'column' }}
                        gap={0}
                    >
                        <AddTags
                            category={categoriesIds[0]}
                            withText={true}
                            color='#ffffd3'
                            size='16px'
                        />
                        <AddNotifications bookmarks={bookmarks} likes={likes} />
                        {isTablet && (
                            <Heading
                                noOfLines={2}
                                variant='sectionContentHeadingStyles'
                                as='h4'
                                size='h4'
                                mt='-2px'
                            >
                                {renderColoredHeading(title, searchStr)}
                            </Heading>
                        )}
                    </Stack>
                    {!isTablet && (
                        <VStack align='flex-start' gap='6px' height={{ lg: '100px', sm: 'auto' }}>
                            <Heading
                                noOfLines={1}
                                variant='sectionHeadingStyles'
                                as='h4'
                                size='h4'
                                mt='-2px'
                            >
                                {renderColoredHeading(title, searchStr)}
                            </Heading>

                            <Text variant='sectionDescription'>{description}</Text>
                        </VStack>
                    )}
                    <ButtonGroup width='100%' justifyContent='flex-end' gap='10px'>
                        <Button
                            fontSize={{ md: '15px', sm: '12px' }}
                            className='card__btn-save'
                            size={{ lg: 'sm', sm: 'xs' }}
                            border='1px solid black'
                            backgroundColor='white'
                            p={{ xl: '8px', lg: '8px', sm: '0' }}
                            leftIcon={
                                <Image
                                    boxSize={{ lg: '16px', sm: '12px' }}
                                    src={socialIcons.shares}
                                />
                            }
                            iconSpacing={{ lg: 2, sm: 0 }}
                        >
                            {!isTablet && 'Сохранить'}
                        </Button>
                        <Button
                            as={Link}
                            to={_id}
                            fontSize={{ md: '15px', sm: '12px' }}
                            className='card__btn-cook'
                            size={{ lg: 'sm', sm: 'xs' }}
                            background='black'
                            color='white'
                            data-test-id={`card-link-${i}`}
                        >
                            Готовить
                        </Button>
                    </ButtonGroup>
                </VStack>
            </HStack>
        );
    },
);
