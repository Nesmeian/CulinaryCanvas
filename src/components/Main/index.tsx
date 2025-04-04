import './style.css';

import { Heading, VStack } from '@chakra-ui/react';

import Search from '../Search';

export default function Main() {
    return (
        <VStack className='main'>
            <Heading as='h1' className='greetings'>
                Приятного аппетита!
            </Heading>
            <Search />
        </VStack>
    );
}
