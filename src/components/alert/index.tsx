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
import { useEffect } from 'react';

import { TEST_IDS } from '~/constants/testsIds';

export const Alert = ({ error }: { error?: string[] }) => {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(onClose, 17_000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);
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
                {error ? (
                    <AlertTitle>{error[0]}</AlertTitle>
                ) : (
                    <VStack>
                        <AlertTitle> Ошибка сервера</AlertTitle>
                        <AlertDescription> Попробуйте поискать снова попозже</AlertDescription>
                    </VStack>
                )}
                <CloseButton data-test-id={TEST_IDS.CLOSE_NOTIFICATION} onClick={onClose} />
            </HStack>
        </AlertElem>
    );
};
