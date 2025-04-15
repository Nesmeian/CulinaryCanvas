import './style.css';

import { Box, VStack } from '@chakra-ui/react';
export default function UnknownBlock() {
    return (
        <VStack className='unknown-block' justify='center' gap='2.4px'>
            <Box className='first-line'></Box>
            <Box className='second-line'></Box>
            <Box className='third-line'></Box>
        </VStack>
    );
}
