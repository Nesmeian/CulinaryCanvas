import './style.css';

import { HStack, VStack } from '@chakra-ui/react';

import SearchControls from './searchControls';
import InputSearch from './searchInput';
import UnknownBlock from './unknownBlock';

export default function Search() {
    return (
        <VStack className='search' gap='15px'>
            <HStack gap='12px' justify='center' align='center'>
                <UnknownBlock />
                <InputSearch />
            </HStack>
            <SearchControls />
        </VStack>
    );
}
