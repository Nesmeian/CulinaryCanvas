import './style.css';

import { Box, VStack } from '@chakra-ui/react';

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
            data-test-id={isOpen ? 'close-icon' : 'hamburger-icon'}
        >
            <Box className='burger__first-line' />
            <Box className='burger__second-line' />
            <Box className='burger__third-line' />
        </VStack>
    );
}
