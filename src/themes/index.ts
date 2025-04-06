import { extendTheme } from '@chakra-ui/react';

import { headerTextStyles } from '~/components/Header/textStyles';
import { notificationTextStyles } from '~/components/Notification/textStyles';
import { sidebarTextStyles } from '~/components/Sidebar/textStyles';
import { writeRecipeTextStyle } from '~/components/WriteRecipe/textStyles';

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
    components: {
        Text: {
            baseStyle: {
                fontSize: {
                    xl: '17px',
                },
                letterSpacing: {
                    xl: '0.3px',
                },
            },
            variants: {
                ...headerTextStyles,
                ...sidebarTextStyles,
                ...writeRecipeTextStyle,
                ...notificationTextStyles,
            },
        },
        Heading: {
            baseStyle: {
                fontFamily: 'inherit',
            },
            sizes: {
                h1: {
                    fontSize: {
                        xl: '48px',
                    },
                },
            },
            defaultProps: {
                size: 'h1',
                as: 'h1',
            },
        },
    },
});

export default theme;
