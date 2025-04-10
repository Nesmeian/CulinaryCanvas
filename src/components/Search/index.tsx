import { HStack, VStack } from '@chakra-ui/react';

import useBreakpoints from '~/themes/chakraBreakPoints';

import SearchControls from './searchControls';
import InputSearch from './searchInput';
import UnknownBlock from './unknownBlock';

export default function Search() {
    const { isTablet } = useBreakpoints();
    return (
        <VStack className='search' gap='15px'>
            <HStack gap='10px' justify='center' align='center'>
                <UnknownBlock />
                <InputSearch />
            </HStack>
            {!isTablet && <SearchControls />}
        </VStack>
    );
}
