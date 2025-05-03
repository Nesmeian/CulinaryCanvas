import './style.css';

import { Button, Grid, Heading, HStack, Text, VStack } from '@chakra-ui/react';

import { useFilteredCategories } from '~/Hooks/useGetFilteredCategories';
import { useGetSubcategoryRecipesData } from '~/Hooks/useGetSubcategoryRecipesData';
import { ComingCategoryData, ComingRecipeData } from '~/types/comingData';

import AddNotifications from '../../../utils/addNotifications';
import AddTags from '../../../utils/addTags';

export default function BottomSection({
    recipes,
    randomCategory,
    isMain,
}: {
    recipes?: ComingRecipeData[];
    randomCategory?: ComingCategoryData;
    isMain?: boolean;
}) {
    const { data } = useFilteredCategories(true);
    const { categoryData: mainCategory, recipes: mainRecipes } = useGetSubcategoryRecipesData(data);
    const all: ComingRecipeData[] = isMain ? (mainRecipes?.data ?? []) : (recipes ?? []);
    const title = isMain ? mainCategory?.title : randomCategory?.title;
    const description = isMain ? mainCategory?.description : randomCategory?.description;
    const recipesLength = recipes?.length ?? 0;
    const bigCardLengthSlice = Math.min(recipesLength - 1, 2);
    const smallCardLengthSlice = Math.min(recipesLength - 1, 5);
    const bigCards = all?.length >= 2 ? all.slice(0, bigCardLengthSlice) : [];
    const smallCards = all?.length >= 5 ? all.slice(2, smallCardLengthSlice) : [];

    if (bigCards.length === 0) {
        return null;
    }
    return (
        <VStack
            mt='auto'
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
                    {title}
                </Heading>
                <Text lineHeight='20px'>{description}</Text>
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
                    {bigCards?.length > 0 &&
                        bigCards?.map(
                            ({ _id, title, categoriesIds, description, bookmarks, likes }) => (
                                <VStack
                                    key={_id}
                                    className='bottom-section__card-item'
                                    _hover={{
                                        boxShadow:
                                            '0 2px 4px -1px rgba(32, 126, 0, 0.06), 0 4px 6px -1px rgba(32, 126, 0, 0.1)',
                                    }}
                                >
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
                                    <HStack
                                        width='100%'
                                        justify='space-between'
                                        position='relative'
                                    >
                                        <AddTags
                                            category={categoriesIds}
                                            withText
                                            size='14px'
                                            color='#ffffd3;'
                                            newPosition
                                        />
                                        <AddNotifications bookmarks={bookmarks} likes={likes} />
                                    </HStack>
                                </VStack>
                            ),
                        )}
                </Grid>
                <VStack gap={{ lg: '12px', md: '8px', sm: '15px' }} width='100%'>
                    {smallCards?.length > 0 &&
                        smallCards?.map(({ title, categoriesIds }) => (
                            <HStack
                                _hover={{
                                    boxShadow:
                                        '0 2px 4px -1px rgba(32, 126, 0, 0.06), 0 4px 6px -1px rgba(32, 126, 0, 0.1)',
                                }}
                                key={title}
                                className='bottom-section__recipe-item'
                                width='100%'
                                justify='space-between'
                            >
                                <HStack gap='0px' position='relative' width='70%'>
                                    <AddTags
                                        category={categoriesIds}
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
