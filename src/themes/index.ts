import { extendTheme } from '@chakra-ui/react';

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
                sidebarItems: {
                    fontSize: {
                        xl: '17px',
                    },
                },
                sidebarFooter: {
                    fontSize: {
                        xl: '12px',
                    },
                },
                medium: {
                    fontSize: 'paragraphMd', // 18px
                    fontWeight: '500',
                },
                large: {
                    fontSize: 'paragraphLg', // 20px
                    lineHeight: '1.8',
                },
                special: {
                    fontSize: 'paragraphXl', // 17px
                    fontStyle: 'italic',
                },
            },
        },
    },
});

export default theme;
