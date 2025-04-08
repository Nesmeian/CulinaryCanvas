import './style.css';

import { Heading, VStack } from '@chakra-ui/react';

import Search from '../Search';
import CulinaryBlogs from '../sections/culinaryBlogs';
import Juiciest from '../sections/Juiciest';
import VeganCuisine from '../sections/veganСuisine';
import Slider from '../slider';

export default function Main() {
    return (
        <VStack className='main' width='75%'>
            <Heading as='h1' size='h1' className='title'>
                Приятного аппетита!
            </Heading>
            <Search />
            <Slider />
            <Juiciest />
            <CulinaryBlogs />
            <VeganCuisine />
        </VStack>
    );
}
