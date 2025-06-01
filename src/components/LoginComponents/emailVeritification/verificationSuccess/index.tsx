import { Center, Heading, Image, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import {
    LoginCheckTextStyles,
    LoginDescriptionStyles,
    loginModalContentStyles,
    LoginModalHeader,
    loginModalWrapperStyles,
} from '~/components/Pages/Login/styles';
import { TEST_IDS } from '~/constants/testsIds';

import * as loginImgs from '../../../../assets/LoginImg/index';
import closeBtn from '../../../../assets/verificationCloseImg.svg';
export const EmailVerificationSuccess = ({ email }: { email: string }) => {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    const navigate = useNavigate();
    if (!isOpen) return null;
    const onClick = () => {
        navigate('/login', { replace: true });
        onClose();
    };
    return (
        <Center data-test-id={TEST_IDS.SIGN_UP_SUCCESS_MODAL} {...loginModalWrapperStyles}>
            <VStack w={{ lg: '400px', base: '316px' }} {...loginModalContentStyles}>
                <Image
                    src={loginImgs.regVerification}
                    alt='registration image verification'
                    boxSize={{ lg: 'auto', base: '108px' }}
                />
                <Heading {...LoginModalHeader}>
                    Остался последний шаг. Нужно верифицировать ваш e-mail
                </Heading>
                <Text {...LoginDescriptionStyles} px='50px'>
                    Мы отправили вам на почту
                    <Text as='span' fontWeight='600'>
                        {` ${email || ''} `}
                    </Text>
                    ссылку для верификации.
                </Text>
                <VStack gap={0}>
                    <Text p='0 40px' {...LoginCheckTextStyles}>
                        Не пришло письмо? Проверьте папку Спам. По другим вопросам свяжитесь с
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
                    onClick={onClick}
                />
            </VStack>
        </Center>
    );
};
