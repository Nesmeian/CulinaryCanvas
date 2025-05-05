import {
    Alert as AlertElem,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    HStack,
    VStack,
} from '@chakra-ui/react';

export const Alert = () => (
    <AlertElem status='error' w={{ lg: '400px', base: '328px' }} h='72px' mt='auto' mb='80px'>
        <HStack>
            <AlertIcon />
            <VStack>
                <AlertTitle> Ошибка сервера</AlertTitle>
                <AlertDescription> Попробуйте поискать снова позже</AlertDescription>
            </VStack>
        </HStack>
    </AlertElem>
);
