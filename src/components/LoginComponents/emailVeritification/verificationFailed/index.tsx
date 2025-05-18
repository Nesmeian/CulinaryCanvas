import { Center, Heading, Image, Text, useDisclosure, VStack } from '@chakra-ui/react';

import {
    LoginCheckTextStyles,
    LoginDescriptionStyles,
    loginModalContentStyles,
    LoginModalHeader,
    loginModalWrapperStyles,
} from '~/components/Pages/Login/styles';
import { EmailVerificationFailedText } from '~/constants/LoginTextModals';
import { TEST_IDS } from '~/constants/testsIds';

import * as loginImgs from '../../../../assets/LoginImg/index';
import closeBtn from '../../../../assets/verificationCloseImg.svg';

export const EmailVerificationFailed = () => {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

    if (!isOpen) return null;
    return (
        <Center
            data-test-id={TEST_IDS.EMAIL_VERIFICATION_FAILED_MODAL}
            {...loginModalWrapperStyles}
        >
            <VStack w={{ lg: '400px', base: '316px' }} {...loginModalContentStyles}>
                <Image
                    src={loginImgs.regVerificationFailed}
                    boxSize={{ lg: 'auto', base: '108px' }}
                    alt='registration image verification'
                />
                <Heading {...LoginModalHeader}>Упс! Что-то пошло не так</Heading>
                <Text {...LoginDescriptionStyles}>{EmailVerificationFailedText.description}</Text>
                <VStack gap={0}>
                    <Text {...LoginCheckTextStyles}>
                        {EmailVerificationFailedText.check}
                        <Text fontSize='12px' as='span' textDecoration='underline'>
                            {` поддержкой`}
                        </Text>
                    </Text>
                </VStack>
                <Image
                    data-test-id={TEST_IDS.CLOSE_BTN}
                    position='absolute'
                    right='24px'
                    src={closeBtn}
                    alt='close img'
                    onClick={onClose}
                />
            </VStack>
        </Center>
    );
};
