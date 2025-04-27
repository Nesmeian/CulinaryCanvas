import './style.css';

import { Box, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleBurgerState } from '~/store/burgerSlice';
import { ApplicationState } from '~/store/configure-store';

export default function Burger() {
    const burgerState = useSelector((state: ApplicationState) => state.burgerState.isOpen);
    const dispatch = useDispatch();
    return (
        <VStack
            className={`burger ${burgerState ? 'active' : ''}`}
            justify='center'
            gap='3px'
            onClick={() => {
                dispatch(toggleBurgerState());
            }}
            data-test-id={burgerState ? 'close-icon' : 'hamburger-icon'}
        >
            <Box className='burger__first-line' />
            <Box className='burger__second-line' />
            <Box className='burger__third-line' />
        </VStack>
    );
}
