import './style.css';

import { Box, VStack } from '@chakra-ui/react';

export default function Burger() {
    return (
        <VStack className='burger' justify='center' gap='3px'>
            <Box className='burger__first-line'></Box>
            <Box className='burger__second-line'></Box>
            <Box className='burger__third-line'></Box>
        </VStack>
    );
}
