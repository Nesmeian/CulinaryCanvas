import { Heading, Text, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { ApplicationState } from '~/store/configure-store';
import filterOnSubCategories from '~/utils/filterOnsubcategorys';
import getSearchCards from '~/utils/getSearchCards';

import DB from '../../data/db.json';
import useBreakpoints from '../../themes/chakraBreakPoints';
import { CategoriesProps } from '../../types/dataTypes';
import GetCurrentPath from '../../utils/getCurrentPath';
import BigCardsList from '../bigCardsList';
import Footer from '../Footer';
import Search from '../Search';
import BottomSection from '../sections/bottomsection';
import GreenButton from '../styledComponents/greenButton';
import MainStyled from '../styledComponents/Main';
import AddTabList from '../tabList';
export default function Categories({ category, subcategory }: CategoriesProps) {
    const pathSegments = GetCurrentPath();
    const bottomSectionData = category === 'juiciest' ? 'vegan' : 'desserts';
    const { isTablet } = useBreakpoints();
    const searchState = useSelector((state: ApplicationState) => state.searchState.search);
    const allowSearch = useSelector((state: ApplicationState) => state.searchState.allowSearch);
    const searchArrs = getSearchCards(searchState, category);
    const searchDb = subcategory
        ? filterOnSubCategories(DB[category].elems.card, subcategory)
        : DB[category].elems.card;

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
                    {(pathSegments.length !== 0 || category !== 'juiciest') && (
                        <AddTabList location={pathSegments[1]} />
                    )}
                    <BigCardsList data={searchDb} maxElems={8} />
                    <GreenButton text='Загрузить еще' />
                    <BottomSection data={DB[bottomSectionData]} />
                </>
            )}

            {isTablet && <Footer />}
        </MainStyled>
    );
}
