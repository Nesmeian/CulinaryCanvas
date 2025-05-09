import './style.css';

import { Box, VStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { TEST_IDS } from '~/constants/testsIds';
import { cleanAllergens, stopAllergens } from '~/store/allergens';
import { setAllowSearch, setSearchState } from '~/store/searchSlice';
export default function FilterButton({
    onOpen,
    isOpen,
    onClose,
}: {
    onOpen: () => void;
    isOpen: boolean;
    onClose: () => void;
}) {
    const dispatch = useDispatch();

    return (
        <VStack
            className='unknown-block'
            justify='center'
            gap='2.4px'
            data-test-id={TEST_IDS.FILTER_BTN}
            onClick={() => {
                onOpen();
                if (isOpen) {
                    onClose();
                }
                dispatch(cleanAllergens());
                dispatch(stopAllergens());
                dispatch(setSearchState(''));
                dispatch(setAllowSearch(false));
            }}
        >
            <Box className='first-line'></Box>
            <Box className='second-line'></Box>
            <Box className='third-line'></Box>
        </VStack>
    );
}
