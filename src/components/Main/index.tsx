import './style.css';

import { Heading, VStack } from '@chakra-ui/react';

import Search from '../Search';
import CulinaryBlogs from '../sections/culinaryBlogs';
import Juiciest from '../sections/Juiciest';
import VeganCuisine from '../sections/vegancuisine';
import Slider from '../slider';

export default function Main() {
    return (
        <VStack className='main' overflowY='auto'>
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
