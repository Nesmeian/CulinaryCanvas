import './style.css';

import { Box, VStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { closeBurger } from '~/store/burgerSlice';
import { toggleFilterState } from '~/store/filterSlice';
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
            }}
        >
            <Box className='first-line'></Box>
            <Box className='second-line'></Box>
            <Box className='third-line'></Box>
        </VStack>
    );
}
