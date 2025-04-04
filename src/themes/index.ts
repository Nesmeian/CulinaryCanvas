import { extendTheme } from '@chakra-ui/react';

import { headerFonts } from '~/components/Header/headerFonts';
import { sideBarFonts } from '~/components/Sidebar/sidebarThemes';

const breakpoints = {
    sm: '360px',
    md: '768px',
    lg: '1440px',
    xl: '1920px',
};

const theme = extendTheme({
    breakpoints,
    fonts: {
        body: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    },
    fontSizes: {
        paragraphSm: '16px',
        paragraphMd: '18px',
        paragraphLg: '200px',
        paragraphXl: '17px',
    },
    components: {
        Text: {
            baseStyle: {
                fontSize: {
                    base: 'paragraphSm',
                    md: 'paragraphMd',
                    lg: 'paragraphLg',
                    xl: '17px',
                },
                letterSpacing: {
                    xl: '0.3px',
                },
            },
            variants: {
                ...headerFonts,
                ...sideBarFonts,
            },
        },
    },
});

export default theme;
