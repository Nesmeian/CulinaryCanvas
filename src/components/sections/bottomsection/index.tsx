import './style.css';

import { Grid, Heading, Text, VStack } from '@chakra-ui/react';

import { Alert } from '~/components/alert';
import { useGetFilteredCategories } from '~/Hooks/useGetFilteredCategories';
import { useGetSubcategoryRecipesData } from '~/Hooks/useGetSubcategoryRecipesData';
import { ComingCategoryData, ComingRecipeData } from '~/types/comingData';

import { BigCard } from './bigCards';
import { SmallCard } from './smallCards';

export default function BottomSection({
    recipes,
    randomCategory,
    isRandom,
}: {
    recipes?: ComingRecipeData[];
    randomCategory?: ComingCategoryData;
    isRandom?: boolean;
}) {
    const { data } = useGetFilteredCategories(true);
    const {
        categoryData: mainCategory,
        recipes: mainRecipes,
        isError,
    } = useGetSubcategoryRecipesData(data);
    const all: ComingRecipeData[] = isRandom ? (mainRecipes?.data ?? []) : (recipes ?? []);
    const title = isRandom ? mainCategory?.title : randomCategory?.title;
    const description = isRandom ? mainCategory?.description : randomCategory?.description;
    const recipesLength = all?.length ?? 0;
    const bigCardLengthSlice = Math.min(recipesLength, 2);
    const smallCardLengthSlice = Math.min(recipesLength, 5);
    const bigCards = all?.length >= 1 ? all.slice(0, bigCardLengthSlice) : [];
    const smallCards = all?.length >= 3 ? all.slice(2, smallCardLengthSlice) : [];
    if (isError) {
        return <Alert />;
    }
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
                    {bigCards?.length > 0 && <BigCard cards={bigCards} />}
                </Grid>
                <VStack gap={{ lg: '12px', md: '8px', sm: '15px' }} width='100%'>
                    {smallCards?.length > 0 && <SmallCard cards={smallCards} />}
                </VStack>
            </Grid>
        </VStack>
    );
}
