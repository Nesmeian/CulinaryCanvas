import './style.css';

import { Heading } from '@chakra-ui/react';

import useBreakpoints from '~/themes/chakraBreakPoints';

import DB from '../../data/db.json';
import Footer from '../Footer';
import Search from '../Search';
import BottomSection from '../sections/bottomsection';
import CulinaryBlogs from '../sections/culinaryBlogs';
import Juiciest from '../sections/Juiciest';
import Slider from '../slider';
import MainStyled from '../styledComponents/Main';
export default function Main() {
    const { isTablet } = useBreakpoints();
    return (
        <MainStyled as='main'>
            <Heading as='h1' size='h1' className='title'>
                Приятного аппетита!
            </Heading>
            <Search />
            <Slider />
            <Juiciest />
            <CulinaryBlogs />
            <BottomSection data={DB.veganCuisine} />
            {isTablet && <Footer />}
        </MainStyled>
    );
}
