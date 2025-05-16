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

import { alertErrors } from './alertErrors';
type errorMessageType = {
    title: string;
    description: string;
};
export const Alert = ({
    errorStatus,
    errorData,
    errorMessage,
    isSuccessCheck,
    successMessage,
}: {
    errorMessage?: errorMessageType;
    errorStatus?: number;
    errorData?: string;
    isSuccessCheck?: boolean;
    successMessage?: string;
}) => {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(onClose, 15_000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);
    if (!isOpen) {
        return null;
    }
    const status = isSuccessCheck ? 'success' : 'error';
    return (
        <AlertElem
            position='fixed'
            status={status}
            color='white'
            background={isSuccessCheck ? '#38a169;' : ' #e53e3e'}
            left='50%'
            transform='translateX(-50%)'
            w={{ lg: '400px', base: '328px' }}
            zIndex={1000}
            bottom='100px'
            data-test-id={TEST_IDS.ERROR_NOTIFICATION}
        >
            <HStack>
                <AlertIcon color='white' />
                {isSuccessCheck ? (
                    <AlertTitle>{successMessage || ''}</AlertTitle>
                ) : errorMessage ? (
                    <VStack alignItems='flex-start' gap={0}>
                        <AlertTitle>
                            {errorMessage[errorStatus].title || 'Ошибка сервера'}
                        </AlertTitle>
                        <AlertDescription>
                            {errorMessage[errorStatus].description ||
                                'Попробуйте поискать снова попозже'}
                        </AlertDescription>
                    </VStack>
                ) : errorStatus !== 400 ? (
                    <VStack alignItems='flex-start' gap={0}>
                        <AlertTitle>
                            {alertErrors[errorStatus]?.title || 'Ошибка сервера'}
                        </AlertTitle>
                        <AlertDescription>
                            {alertErrors[errorStatus]?.description ||
                                'Попробуйте поискать снова попозже'}
                        </AlertDescription>
                    </VStack>
                ) : errorData ? (
                    <VStack alignItems='flex-start' gap={0}>
                        <AlertTitle>Ошибка</AlertTitle>
                        <AlertDescription>{errorData}</AlertDescription>
                    </VStack>
                ) : (
                    <VStack alignItems='flex-start' gap={0}>
                        <AlertTitle>Ошибка сервера</AlertTitle>
                        <AlertDescription>Попробуйте снова позже</AlertDescription>
                    </VStack>
                )}
                <CloseButton
                    color='white'
                    data-test-id={TEST_IDS.CLOSE_NOTIFICATION}
                    onClick={onClose}
                    position='absolute'
                    top='0px'
                    right={0}
                />
            </HStack>
        </AlertElem>
    );
};
