import './style.css';

import { Heading, VStack } from '@chakra-ui/react';

import Search from '../Search';

export default function Main() {
    return (
        <VStack className='main' width='75%'>
            <Heading as='h1' className='title'>
                Приятного аппетита!
            </Heading>
            <Search />
        </VStack>
    );
}
