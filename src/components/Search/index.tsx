import './style.css';

import { HStack, VStack } from '@chakra-ui/react';

import InputSearch from './searchInput';
import UnknownBlock from './unknownBlock';

export default function Search() {
    return (
        <VStack className='search'>
            <HStack gap='12px' justify='center' align='center'>
                <UnknownBlock />
                <InputSearch />
            </HStack>
        </VStack>
    );
}
