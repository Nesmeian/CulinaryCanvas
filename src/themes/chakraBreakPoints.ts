import { useMediaQuery } from '@chakra-ui/react';

import { Breakpoints } from '~/types/utilsTypes';

const useBreakpoints = (): Breakpoints => {
    const [isMobile] = useMediaQuery('(max-width: 360px)');
    const [isTablet] = useMediaQuery('(max-width: 768px)');
    const [isDesktop] = useMediaQuery('(max-width: 1440px)');

    return {
        isMobile,
        isTablet,
        isDesktop,
    };
};

export default useBreakpoints;
