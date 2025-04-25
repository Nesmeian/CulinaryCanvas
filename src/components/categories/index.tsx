import { Heading } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { ApplicationState } from '~/store/configure-store';
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
export default function Categories({ category }: CategoriesProps) {
    const db = DB;
    const pathSegments = GetCurrentPath();
    const bottomSectionData = category === 'juiciest' ? 'veganCuisine' : 'desserts';
    const { isTablet } = useBreakpoints();
    const searchState = useSelector((state: ApplicationState) => state.searchState.search);
    const allowSearch = useSelector((state: ApplicationState) => state.searchState.allowSearch);
    const searchArrs = getSearchCards(searchState, category);
    return (
        <MainStyled as='main'>
            <Heading
                as='h1'
                size='h1'
                pt={{ base: 0, md: 4 }}
                pb={{ base: '10px', md: 5 }}
            ></Heading>
            <Search />
            {allowSearch ? (
                <BigCardsList data={searchArrs} />
            ) : (
                <>
                    {(pathSegments.length !== 0 || category !== 'juiciest') && (
                        <AddTabList location={pathSegments[1]} />
                    )}
                    <BigCardsList data={db[category].elems.card} maxElems={8} />
                    <GreenButton text='Загрузить еще' />
                    <BottomSection data={DB[bottomSectionData]} />
                </>
            )}

            {isTablet && <Footer />}
        </MainStyled>
    );
}
