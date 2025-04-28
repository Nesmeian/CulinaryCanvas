import './style.css';

import {
    Button,
    ButtonGroup,
    Grid,
    Heading,
    HStack,
    Image,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router';

import * as imgObj from '../../assets/recipeImages/index';
import * as socialIcons from '../../assets/socialIcons/index';
import useBreakpoints from '../../themes/chakraBreakPoints';
import { BigCardsListProps } from '../../types/dataTypes';
import { TagKey } from '../../types/utilsTypes';
import AddNotifications from '../../utils/addNotifications';
import AddRecommendation from '../../utils/addRecommendation';
import AddTags from '../../utils/addTags/index';
export default function BigCardsList({ data, maxElems, categoryTag }: BigCardsListProps) {
    const { isTablet } = useBreakpoints();
    const displayedData = maxElems ? data?.slice(0, maxElems) : data;
    if (data.length === 0) {
        return (
            <Heading as='h1' size='h1'>
                К Сожалению рецептов не обнаруженно
            </Heading>
        );
    }
    return (
        <Grid className='card__list' gap={{ xl: '24px', md: '16px', sm: '11px' }}>
            {displayedData!.map(
                (
                    {
                        id,
                        imgUrl,
                        title,
                        description,
                        category,
                        bookmarks,
                        likes,
                        userRecommendation,
                    },
                    i,
                ) => (
                    <HStack
                        data-test-id={`food-card-${i}`}
                        key={id}
                        className='card__item'
                        position='relative'
                        _hover={{
                            boxShadow:
                                '0 2px 4px -1px rgba(32, 126, 0, 0.06), 0 4px 6px -1px rgba(32, 126, 0, 0.1)',
                        }}
                    >
                        <VStack className='card__item__image-container'>
                            <Image
                                height='100%'
                                width='100%'
                                src={imgObj[imgUrl as keyof typeof imgObj]}
                            />
                            {!isTablet && (
                                <AddRecommendation userRecommendation={userRecommendation} />
                            )}
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
                                    category={categoryTag}
                                    tag={category as TagKey[]}
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
                                        {title}
                                    </Heading>
                                )}
                            </Stack>
                            {!isTablet && (
                                <VStack
                                    align='flex-start'
                                    gap='6px'
                                    height={{ lg: '100px', sm: 'auto' }}
                                >
                                    <Heading
                                        noOfLines={1}
                                        variant='sectionHeadingStyles'
                                        as='h4'
                                        size='h4'
                                        mt='-2px'
                                    >
                                        {title}
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
                                    to={imgUrl}
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
                ),
            )}
        </Grid>
    );
}
