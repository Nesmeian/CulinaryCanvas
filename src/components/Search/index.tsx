import { HStack, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { ApplicationState } from '~/store/configure-store';

import useBreakpoints from '../../themes/chakraBreakPoints';
import Drawer from '../drawer';
import FilterDrawer from '../filterDrawer';
import AllergensControls from './allergensControls';
import FilterButton from './filterButton';
import InputSearch from './searchInput';

export default function Search() {
    const { isTablet } = useBreakpoints();
    const filterState = useSelector((state: ApplicationState) => state.filterState.isOpen);
    return (
        <VStack className='search' gap='15px'>
            <HStack gap='10px' justify='center' align='center'>
                <FilterButton />
                <InputSearch />
            </HStack>
            {!isTablet && <AllergensControls />}
            <Drawer state={filterState} isFilter element={<FilterDrawer />} />
        </VStack>
    );
}
