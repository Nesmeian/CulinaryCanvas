import { useMediaQuery } from '@chakra-ui/react';

import { Breakpoints } from '~/types/utilsTypes';

const useBreakpoints = (): Breakpoints => {
    const [isMobile] = useMediaQuery('(max-width: 500px)');
    const [isTablet] = useMediaQuery('(max-width: 800px)');
    const [isDesktop] = useMediaQuery('(max-width: 1200px)');

    return {
        isMobile,
        isTablet,
        isDesktop,
    };
};

export default useBreakpoints;
