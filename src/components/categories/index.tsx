import { Heading, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGetCategoryId } from '~/Hooks/useGetCategoryAndSubCategoryId';
import { useGetJuiciest } from '~/Hooks/useGetJuiciest';
import { useGetSubcategoryRecipesData } from '~/Hooks/useGetSubcategoryRecipesData';
import { useGetRecipesQuery } from '~/query/services/get';
import { ApplicationState } from '~/store/configure-store';
import { setFindState } from '~/store/searchSlice';
import filterAllergens from '~/utils/filterAllergens';
import filterDrawerData from '~/utils/filterDrawerData';
import filterRecipesOnData from '~/utils/filterOnData';
import filterOnSubCategories from '~/utils/filterOnsubcategorys';
import getSearchCards from '~/utils/getSearchCards';
import hasActiveFilters from '~/utils/hasActiveFilter';

import DB from '../../data/db.json';
import { CategoriesProps } from '../../types/dataTypes';
import BigCardsList from '../bigCardsList';
import { Loader } from '../loader';
import Search from '../Search';
import BottomSection from '../sections/bottomsection';
import GreenButton from '../styledComponents/greenButton';
import MainStyled from '../styledComponents/Main';
import AddTabList from '../tabList';
export default function Categories({ category, subcategory }: CategoriesProps) {
    const dispatch = useDispatch();
    const { data: juiciestData } = useGetJuiciest();
    const { data, isLoading } = useGetRecipesQuery(subcategory);

    const searchQuery = useSelector((state: ApplicationState) => state.searchState.search);
    const allowSearch = useSelector((state: ApplicationState) => state.searchState.allowSearch);
    const allergensActive = useSelector((state: ApplicationState) => state.allergensSlice.isActive);
    const allergenList = useSelector((state: ApplicationState) => state.allergensSlice.allergens);
    const filterState = useSelector((state: ApplicationState) => state.filterState.filterData);
    const { category: categoryData, loading } = useGetCategoryId([subcategory]);
    const categoryCards = DB.card.filter((card) => card.category.includes(category));
    const subCatCards = subcategory
        ? filterOnSubCategories(categoryCards, subcategory)
        : categoryCards;
    const sortedTimeCards = filterRecipesOnData();
    const actualDB = category === 'the-juiciest' ? sortedTimeCards : subCatCards;
    const allergenFiltered = filterAllergens(allergenList, actualDB);
    const drawerFiltered = filterDrawerData(filterState);
    const filtersApplied = hasActiveFilters(filterState);

    const baseCards = filtersApplied
        ? drawerFiltered
        : allergensActive
          ? allergenFiltered
          : actualDB;
    const displayedCards = allowSearch ? getSearchCards(searchQuery, baseCards) : baseCards;
    const showFallback =
        !displayedCards.length && !allowSearch && !filtersApplied && !allergensActive;
    useEffect(() => {
        if (!allowSearch) {
            dispatch(setFindState('common'));
        } else {
            dispatch(setFindState(displayedCards.length > 0 ? 'find' : 'not found'));
        }
    }, [allowSearch, displayedCards, dispatch]);
    const {
        categoryData: catData,
        recipes,
        isLoading: subcatLoading,
    } = useGetSubcategoryRecipesData(categoryData?.subCategories ?? []);
    if (isLoading || loading || subcatLoading) {
        return <Loader />;
    }

    return (
        <MainStyled as='main'>
            <VStack width={{ lg: '50%', base: '100%' }}>
                <Heading as='h1' size='h1' pt={{ base: 0, md: 4 }} pb={{ base: '10px', md: 5 }}>
                    {categoryData?.title}
                </Heading>
                <Text
                    textAlign='center'
                    fontSize={{ base: '14px', lg: '16px' }}
                    fontWeight='500'
                    color='rgba(0, 0, 0, 0.48)'
                >
                    {categoryData?.description}
                </Text>
            </VStack>

            <Search />
            {category !== 'the-juiciest' && <AddTabList category={category} />}
            {showFallback ? (
                <>
                    <BigCardsList data={data?.data} />
                    <GreenButton text='Загрузить еще' />
                </>
            ) : (
                <>
                    <BigCardsList data={juiciestData?.data} />
                    <GreenButton text='Загрузить еще' />
                    <BottomSection isMain />
                </>
            )}

            <BottomSection recipes={recipes?.data} randomCategory={catData} />
        </MainStyled>
    );
}
