import { Box, Spinner } from '@chakra-ui/react';

import { TEST_IDS } from '~/constants/testsIds';

export const SearchLoader = () => (
    <Box
        data-test-id={TEST_IDS.LOADER_SEARCH_BLOCK}
        h='136px'
        w='136px'
        display='flex'
        justifyContent='center'
        alignItems='center'
        background='radial-gradient(50% 50% at 50% 50%, #c4ff61 0%, rgba(255, 255, 255, 0) 100%)'
    >
        <Spinner size='lg' thickness='2px' color='black' />
    </Box>
);
