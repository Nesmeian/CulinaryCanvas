import {
    Alert as AlertElem,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    CloseButton,
    HStack,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';

import { TEST_IDS } from '~/constants/testsIds';

export const Alert = () => {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    if (!isOpen) {
        return null;
    }
    return (
        <AlertElem
            position='fixed'
            status='error'
            left='50%'
            transform='translateX(-50%)'
            w={{ lg: '400px', base: '328px' }}
            h='72px'
            zIndex={1000}
            bottom='100px'
            data-test-id={TEST_IDS.ERROR_NOTIFICATION}
        >
            <HStack>
                <AlertIcon />
                <VStack>
                    <AlertTitle> Ошибка сервера</AlertTitle>
                    <AlertDescription> Попробуйте поискать снова попозже</AlertDescription>
                </VStack>
                <CloseButton data-test-id={TEST_IDS.CLOSE_NOTIFICATION} onClick={onClose} />
            </HStack>
        </AlertElem>
    );
};
