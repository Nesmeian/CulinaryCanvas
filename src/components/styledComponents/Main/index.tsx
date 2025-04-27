import { styled, VStack } from '@chakra-ui/react';

const MainStyled = styled(VStack, {
    baseStyle: {
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
        flex: 1,
        width: {
            base: '100%',
            md: 'calc(100% - 542px)',
        },
        pl: {
            base: '16px',
            md: '20px',
            sm: '16px',
        },
        pr: {
            base: 0,
            lg: '6px',
            md: '20px',
            sm: '14px',
        },
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            width: '0',
            height: '0',
            background: 'transparent',
        },
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '8px',
    },
});

export default MainStyled;
