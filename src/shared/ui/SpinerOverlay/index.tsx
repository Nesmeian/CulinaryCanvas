import { Spinner, VStack } from '@chakra-ui/react';

export const SpinnerOverlay = () => (
    <VStack
        position='absolute'
        top='50%'
        left='50%'
        w='134px'
        h='134px'
        transform='translate(-50%,-50%)'
        justify='center'
        align='center'
        background=' radial-gradient(50% 50% at 50% 50%, #c4ff61 0%, rgba(255, 255, 255, 0) 100%)'
    >
        <Spinner size='md' />
    </VStack>
);
