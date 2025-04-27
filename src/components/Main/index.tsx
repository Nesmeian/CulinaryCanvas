import './style.css';

import { Heading } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { ApplicationState } from '~/store/configure-store';
import filterAllergens from '~/utils/filterAllergens';
import filterDrawerData from '~/utils/filterDrawerData';
import getSearchCards from '~/utils/getSearchCards';
import hasActiveFilters from '~/utils/hasActiveFilter';

import DB from '../../data/db.json';
import useBreakpoints from '../../themes/chakraBreakPoints';
import BigCardsList from '../bigCardsList';
import Footer from '../Footer';
import Search from '../Search';
import BottomSection from '../sections/bottomsection';
import CulinaryBlogs from '../sections/culinaryBlogs';
import Juiciest from '../sections/Juiciest';
import Slider from '../slider';
import MainStyled from '../styledComponents/Main';
export default function Main() {
    const { isTablet } = useBreakpoints();
    const allergensState = useSelector((state: ApplicationState) => state.allergensSlice.isActive);
    const searchState = useSelector((state: ApplicationState) => state.searchState.search);
    const allowSearch = useSelector((state: ApplicationState) => state.searchState.allowSearch);
    const allergens = useSelector((state: ApplicationState) => state.allergensSlice.allergens);
    const filterState = useSelector((state: ApplicationState) => state.filterState.filterData);
    const searchArrs = getSearchCards(searchState);
    const filteredAllergens = filterAllergens(allergens, DB.card);
    const filterData = filterDrawerData(filterState);
    return (
        <MainStyled as='main'>
            <Heading as='h1' size='h1' className='title'>
                Приятного аппетита!
            </Heading>
            <Search />
            {hasActiveFilters(filterState) ? (
                <BigCardsList data={filterData} />
            ) : allergensState ? (
                <BigCardsList data={filteredAllergens} />
            ) : allowSearch ? (
                <BigCardsList data={searchArrs} />
            ) : (
                <>
                    <Slider />
                    <Juiciest />
                    <CulinaryBlogs />
                    <BottomSection data={DB.vegan} />
                </>
            )}

            {isTablet && <Footer />}
        </MainStyled>
    );
}
