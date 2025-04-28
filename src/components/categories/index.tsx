import { Heading, Text, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { ApplicationState } from '~/store/configure-store';
import filterAllergens from '~/utils/filterAllergens';
import filterDrawerData from '~/utils/filterDrawerData';
import filterRecipesOnData from '~/utils/filterOnData';
import filterOnSubCategories from '~/utils/filterOnsubcategorys';
import getSearchCards from '~/utils/getSearchCards';
import hasActiveFilters from '~/utils/hasActiveFilter';

import DB from '../../data/db.json';
import { CategoriesProps } from '../../types/dataTypes';
import BigCardsList from '../bigCardsList';
import Footer from '../Footer';
import Search from '../Search';
import BottomSection from '../sections/bottomsection';
import GreenButton from '../styledComponents/greenButton';
import MainStyled from '../styledComponents/Main';
import AddTabList from '../tabList';
export default function Categories({ category, subcategory }: CategoriesProps) {
    const searchQuery = useSelector((state: ApplicationState) => state.searchState.search);
    const allowSearch = useSelector((state: ApplicationState) => state.searchState.allowSearch);
    const allergensActive = useSelector((state: ApplicationState) => state.allergensSlice.isActive);
    const allergenList = useSelector((state: ApplicationState) => state.allergensSlice.allergens);
    const filterState = useSelector((state: ApplicationState) => state.filterState.filterData);

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

    const bottomSectionData = category === 'the-juiciest' ? 'vegan' : 'desserts';

    return (
        <MainStyled as='main'>
            <VStack width={{ lg: '50%', base: '100%' }}>
                <Heading as='h1' size='h1' pt={{ base: 0, md: 4 }} pb={{ base: '10px', md: 5 }}>
                    {DB[category].title}
                </Heading>
                <Text
                    textAlign='center'
                    fontSize={{ base: '14px', lg: '16px' }}
                    fontWeight='500'
                    color='rgba(0, 0, 0, 0.48)'
                >
                    {DB[category].description}
                </Text>
            </VStack>

            <Search />

            {showFallback ? (
                <>
                    {category !== 'the-juiciest' && <AddTabList category={category} />}
                    <BigCardsList data={actualDB} maxElems={8} categoryTag={category} />
                    {actualDB.length > 8 && <GreenButton text='Загрузить еще' />}
                    <BottomSection data={DB[bottomSectionData]} />
                </>
            ) : (
                <BigCardsList data={displayedCards} />
            )}

            <Footer />
        </MainStyled>
    );
}
