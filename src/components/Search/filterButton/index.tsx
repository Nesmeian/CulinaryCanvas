import './style.css';

import { Box, VStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { cleanAllergens, stopAllergens } from '~/store/allergens';
import { closeBurger } from '~/store/burgerSlice';
import { toggleFilterState } from '~/store/filterSlice';
import { setAllowSearch, setSearchState } from '~/store/searchSlice';
export default function FilterButton() {
    const dispatch = useDispatch();

    return (
        <VStack
            className='unknown-block'
            justify='center'
            gap='2.4px'
            onClick={() => {
                dispatch(toggleFilterState());
                dispatch(closeBurger());
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
