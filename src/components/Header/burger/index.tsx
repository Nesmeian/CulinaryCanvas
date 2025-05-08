import './style.css';

import { Box, VStack } from '@chakra-ui/react';

import { TEST_IDS } from '~/constants/testsIds';

export default function Burger({
    onClick,
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClick: () => void;
    onClose: () => void;
}) {
    return (
        <VStack
            className={`burger ${isOpen ? 'active' : ''}`}
            justify='center'
            gap='3px'
            onClick={() => {
                onClick();
                if (isOpen) {
                    onClose();
                }
            }}
            data-test-id={isOpen ? TEST_IDS.CLOSE_ICON : TEST_IDS.HAMBER_ICON}
        >
            <Box className='burger__first-line' />
            <Box className='burger__second-line' />
            <Box className='burger__third-line' />
        </VStack>
    );
}
