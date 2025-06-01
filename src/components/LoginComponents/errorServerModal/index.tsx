import { Button, Center, Heading, Image, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { Alert } from '~/components/alert';
import { Loader } from '~/components/loader';
import {
    LoginCheckTextStyles,
    loginModalContentStyles,
    LoginModalHeader,
    loginModalWrapperStyles,
} from '~/components/Pages/Login/styles';
import { TEST_IDS } from '~/constants/testsIds';
import { usePostAuthLoginMutation } from '~/query/services/post/regLog';
import { LoginFields } from '~/types/LoginTypes';

import * as loginImgs from '../../../assets/LoginImg/index';
import closeBtn from '../../../assets/verificationCloseImg.svg';
export const ErrorServerModal = ({ repeatSend }: { repeatSend: LoginFields | [] }) => {
    const [postAuthLogin, { isLoading, isSuccess, isError, error }] = usePostAuthLoginMutation();
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    const navigate = useNavigate();
    useEffect(() => {
        if (isSuccess) {
            navigate('/', { replace: true });
        }
    }, [isSuccess, navigate]);
    if (!isOpen) return null;
    const onclick = () => {
        postAuthLogin(repeatSend);
        onClose();
    };
    if (isError) {
        onClose();
        return <Alert errorStatus={error.statusCode} />;
    }

    return (
        <Center data-test-id={TEST_IDS.SIGN_IN_ERROR_MODAL} {...loginModalWrapperStyles}>
            <VStack w={{ lg: '400px', base: '316px' }} {...loginModalContentStyles}>
                <Image
                    src={loginImgs.forgetModal}
                    boxSize={{ lg: 'auto', base: '108px' }}
                    alt='registration image verification'
                />
                <Heading {...LoginModalHeader}>Вход не выполнен</Heading>
                <VStack gap={0}>
                    <Text {...LoginCheckTextStyles}>
                        Что-то пошло не так.
                        <br /> Попробуйте еще раз
                    </Text>
                </VStack>
                <Button
                    variant='commonLoginBtn'
                    onClick={onclick}
                    data-test-id={TEST_IDS.REPEAT_BTN}
                >
                    Повторить
                </Button>
                <Image
                    data-test-id={TEST_IDS.CLOSE_BTN}
                    position='absolute'
                    right='24px'
                    src={closeBtn}
                    alt='close img'
                    onClick={onClose}
                />
            </VStack>
            {isLoading && <Loader />}
        </Center>
    );
};
