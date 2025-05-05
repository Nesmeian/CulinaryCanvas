import {
    Alert as AlertElem,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    CloseButton,
    HStack,
    VStack,
} from '@chakra-ui/react';

import { TEST_IDS } from '~/constants/testsIds';

export const Alert = () => (
    <AlertElem
        status='error'
        w={{ lg: '400px', base: '328px' }}
        h='72px'
        mt='auto'
        mb='80px'
        data-test-id={TEST_IDS.ERROR_NOTIFICATION}
    >
        <HStack>
            <AlertIcon />
            <VStack>
                <AlertTitle> Ошибка сервера</AlertTitle>
                <AlertDescription> Попробуйте поискать снова позже</AlertDescription>
            </VStack>
            <CloseButton data-test-id={TEST_IDS.CLOSE_NOTIFICATION} />
        </HStack>
    </AlertElem>
);
