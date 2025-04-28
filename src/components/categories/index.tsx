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
    const bottomSectionData = category === 'the-juiciest' ? 'vegan' : 'desserts';

    const searchState = useSelector((state: ApplicationState) => state.searchState.search);
    const allowSearch = useSelector((state: ApplicationState) => state.searchState.allowSearch);
    const allergenState = useSelector((state: ApplicationState) => state.allergensSlice.isActive);
    const allergens = useSelector((state: ApplicationState) => state.allergensSlice.allergens);

    const searchArrs = getSearchCards(searchState, category, subcategory);
    const categoryDb = DB.card.filter((e) => e.category.includes(category));
    const allergenFilter = subcategory
        ? filterAllergens(allergens, filterOnSubCategories(categoryDb, subcategory))
        : filterAllergens(allergens, categoryDb);

    const searchDb = subcategory ? filterOnSubCategories(categoryDb, subcategory) : categoryDb;
    const sortedOnTimeRecipes = filterRecipesOnData();
    const actualDB = category === 'the-juiciest' ? sortedOnTimeRecipes : searchDb;
    const filterStateData = useSelector((state: ApplicationState) => state.filterState.filterData);
    const filterData = filterDrawerData(filterStateData);
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
            {hasActiveFilters(filterStateData) ? (
                <BigCardsList data={filterData} />
            ) : allergenState ? (
                <BigCardsList data={allergenFilter} />
            ) : allowSearch ? (
                <BigCardsList data={searchArrs} />
            ) : (
                <>
                    {category !== 'the-juiciest' && <AddTabList category={category} />}
                    <BigCardsList data={actualDB} maxElems={8} categoryTag={category} />
                    {actualDB.length > 4 && <GreenButton text='Загрузить еще' />}
                    <BottomSection data={DB[bottomSectionData]} />
                </>
            )}

            <Footer />
        </MainStyled>
    );
}
