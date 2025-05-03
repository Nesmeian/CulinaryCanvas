import './style.css';

import { Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ApplicationState } from '~/store/configure-store';
import { setFindState } from '~/store/searchSlice';
import filterAllergens from '~/utils/filterAllergens';
import filterDrawerData from '~/utils/filterDrawerData';
import getSearchCards from '~/utils/getSearchCards';
import hasActiveFilters from '~/utils/hasActiveFilter';

import DB from '../../data/db.json';
import BigCardsList from '../bigCardsList';
import Search from '../Search';
import BottomSection from '../sections/bottomsection';
import CulinaryBlogs from '../sections/culinaryBlogs';
import Juiciest from '../sections/Juiciest';
import Slider from '../slider';
import MainStyled from '../styledComponents/Main';
export default function Main() {
    const dispatch = useDispatch();
    const allergensActive = useSelector((state: ApplicationState) => state.allergensSlice.isActive);
    const searchQuery = useSelector((state: ApplicationState) => state.searchState.search);
    const allowSearch = useSelector((state: ApplicationState) => state.searchState.allowSearch);
    const allergenList = useSelector((state: ApplicationState) => state.allergensSlice.allergens);
    const filterState = useSelector((state: ApplicationState) => state.filterState.filterData);

    const allCards = DB.card;
    const filteredAllergens = filterAllergens(allergenList, allCards);
    const filterData = filterDrawerData(filterState);
    const filtersApplied = hasActiveFilters(filterState);
    const baseCards = filtersApplied ? filterData : allergensActive ? filteredAllergens : allCards;
    const displayedCards = allowSearch ? getSearchCards(searchQuery, baseCards) : baseCards;
    const showFallback = !allowSearch && !filtersApplied && !allergensActive;
    useEffect(() => {
        if (!allowSearch) {
            dispatch(setFindState('common'));
        } else {
            dispatch(setFindState(displayedCards.length > 0 ? 'find' : 'not found'));
        }
    }, [allowSearch, displayedCards, dispatch]);
    return (
        <MainStyled as='main'>
            <Heading as='h1' size='h1' className='title'>
                Приятного аппетита!
            </Heading>

            <Search />

            {showFallback ? (
                <>
                    <Slider />
                    <Juiciest />
                    <CulinaryBlogs />
                    <BottomSection data={DB.vegan} />
                </>
            ) : (
                <BigCardsList data={displayedCards} />
            )}
        </MainStyled>
    );
}
