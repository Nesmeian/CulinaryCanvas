import './style.css';

import { HStack } from '@chakra-ui/react';

import Search from '../Search';

export default function Main() {
    return (
        <HStack className='main'>
            <Search />
        </HStack>
    );
}
