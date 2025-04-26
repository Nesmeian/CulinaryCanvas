import './style.css';

import { Heading } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { ApplicationState } from '~/store/configure-store';
import getSearchCards from '~/utils/getSearchCards';

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

    const searchState = useSelector((state: ApplicationState) => state.searchState.search);
    const allowSearch = useSelector((state: ApplicationState) => state.searchState.allowSearch);
    const searchArrs = getSearchCards(searchState);
    return (
        <MainStyled as='main'>
            <Heading as='h1' size='h1' className='title'>
                Приятного аппетита!
            </Heading>
            <Search />

            {allowSearch ? (
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
