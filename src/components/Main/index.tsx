import './style.css';

import { Heading, VStack } from '@chakra-ui/react';

import useBreakpoints from '~/themes/chakraBreakPoints';

import Footer from '../Footer';
import Search from '../Search';
import CulinaryBlogs from '../sections/culinaryBlogs';
import Juiciest from '../sections/Juiciest';
import VeganCuisine from '../sections/vegancuisine';
import Slider from '../slider';

export default function Main() {
    const { isTablet } = useBreakpoints();
    return (
        <VStack className='main' as='main' flex={1} overflowY='scroll'>
            <Heading as='h1' size='h1' className='title'>
                Приятного аппетита!
            </Heading>
            <Search />
            <Slider />
            <Juiciest />
            <CulinaryBlogs />
            <VeganCuisine />
            {isTablet && <Footer />}
        </VStack>
    );
}
