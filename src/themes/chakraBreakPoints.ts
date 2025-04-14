import { useMediaQuery } from '@chakra-ui/react';

import { Breakpoints } from '~/types/utilsTypes';

const useBreakpoints = (): Breakpoints => {
    const [isMobile] = useMediaQuery('(max-width: 500px)', { ssr: true });
    const [isTablet] = useMediaQuery('(max-width: 800px)', { ssr: true });
    const [isDesktop] = useMediaQuery('(max-width: 1200px)', { ssr: true });

    return {
        isMobile,
        isTablet,
        isDesktop,
    };
};

export default useBreakpoints;
