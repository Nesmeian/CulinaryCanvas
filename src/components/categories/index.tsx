import { Heading, Text, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { ApplicationState } from '~/store/configure-store';
import filterRecipesOnData from '~/utils/filterOnData';
import filterOnSubCategories from '~/utils/filterOnsubcategorys';
import getSearchCards from '~/utils/getSearchCards';

import DB from '../../data/db.json';
import useBreakpoints from '../../themes/chakraBreakPoints';
import { CategoriesProps } from '../../types/dataTypes';
import BigCardsList from '../bigCardsList';
import Footer from '../Footer';
import Search from '../Search';
import BottomSection from '../sections/bottomsection';
import GreenButton from '../styledComponents/greenButton';
import MainStyled from '../styledComponents/Main';
import AddTabList from '../tabList';
export default function Categories({ category, subcategory }: CategoriesProps) {
    const bottomSectionData = category === 'juiciest' ? 'vegan' : 'desserts';
    const { isTablet } = useBreakpoints();
    const searchState = useSelector((state: ApplicationState) => state.searchState.search);
    const allowSearch = useSelector((state: ApplicationState) => state.searchState.allowSearch);
    const searchArrs = getSearchCards(searchState, category, subcategory);
    const categoryDb = DB.card.filter((e) => e.category.includes(category));
    const searchDb = subcategory ? filterOnSubCategories(categoryDb, subcategory) : categoryDb;
    const sortedOnTimeRecipes = filterRecipesOnData();
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
            {allowSearch ? (
                <BigCardsList data={searchArrs} />
            ) : (
                <>
                    {category !== 'juiciest' && <AddTabList category={category} />}
                    <BigCardsList
                        data={category === 'juiciest' ? sortedOnTimeRecipes : searchDb}
                        maxElems={8}
                        categoryTag={category}
                    />
                    <GreenButton text='Загрузить еще' />
                    <BottomSection data={DB[bottomSectionData]} />
                </>
            )}

            {isTablet && <Footer />}
        </MainStyled>
    );
}
