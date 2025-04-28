import { HStack, useDisclosure, VStack } from '@chakra-ui/react';

import useBreakpoints from '../../themes/chakraBreakPoints';
import Drawer from '../drawer';
import FilterDrawer from '../filterDrawer';
import AllergensControls from './allergensControls';
import FilterButton from './filterButton';
import InputSearch from './searchInput';

export default function Search() {
    const { isTablet } = useBreakpoints();
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <VStack className='search' gap='15px'>
            <HStack gap='10px' justify='center' align='center'>
                <FilterButton onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
                <InputSearch />
            </HStack>
            {!isTablet && <AllergensControls />}
            <Drawer isOpen={isOpen} onClose={onClose} isFilter element={<FilterDrawer />} />
        </VStack>
    );
}
