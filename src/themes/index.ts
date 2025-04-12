import { extendTheme } from '@chakra-ui/react';

import { headerTextStyles } from '~/components/Header/textStyles';
import { navMenuTextStyles } from '~/components/navMenu/textStyles';
import { notificationTextStyles } from '~/components/Notification/textStyles';
import sectionTextStyles, { sectionHeadingStyles } from '~/components/sections/sectionTextStyles';
import { writeRecipeTextStyle } from '~/components/WriteRecipe/textStyles';
import utilsTextStyles from '~/utils/utilsTextStyles';

const breakpoints = {
    sm: '300px',
    md: '600px',
    lg: '1200px',
    xl: '1920px',
};

const theme = extendTheme({
    breakpoints,
    colors: {
        customGreen: {
            500: '#2db100',
            600: '#259900',
            700: '#1c8000',
        },
    },
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
                ...navMenuTextStyles,
                ...writeRecipeTextStyle,
                ...notificationTextStyles,
                ...sectionTextStyles,
                ...utilsTextStyles,
            },
        },
        Heading: {
            baseStyle: {
                fontFamily: 'inherit',
                letterSpacing: '0.3px',
            },
            variants: {
                ...sectionHeadingStyles,
            },
            sizes: {
                h1: {
                    fontSize: {
                        lg: '48px',
                        sm: '24px',
                    },
                    letterSpacing: '1px',
                },
                h2: {
                    fontSize: {
                        xl: '48px',
                        lg: '36px',
                        sm: '24px',
                    },
                    letterSpacing: {
                        xl: '2px',
                        lg: '1.5px',
                        sm: '1px',
                    },
                    fontWeight: 500,
                },
                h3: {
                    fontSize: {
                        xl: '36px',
                        lg: '30px',
                        sm: '24px',
                    },
                    fontWeight: '500',
                    letterSpacing: '1px',
                },
                h4: {
                    fontSize: {
                        xl: '20px',
                        lg: '18px',
                        sm: '16px',
                    },
                    fontWeight: '500',
                    letterSpacing: '0.9px',
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
