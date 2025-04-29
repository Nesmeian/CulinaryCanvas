import { styled, VStack } from '@chakra-ui/react';

export const StyledNav = styled(VStack, {
    baseStyle: {
        w: '100%',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            width: '0',
            height: '0',
            background: 'transparent',
        },
    },
});
