import { Button, Center, Heading, Image, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { Alert } from '~/components/alert';
import { Loader } from '~/components/loader';
import { TEST_IDS } from '~/constants/testsIds';
import { usePostAuthLoginMutation } from '~/query/services/post';
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
        <Center
            data-test-id={TEST_IDS.SIGN_IN_ERROR_MODAL}
            h='100vh'
            w='100vw'
            bg='rgba(0, 0, 0, 0.7)'
            position='fixed'
            top={0}
            left={0}
            zIndex={9999}
        >
            <VStack
                w='400px'
                background='white'
                borderRadius='16px'
                p='32px'
                gap='24px'
                position='relative'
            >
                <Image src={loginImgs.forgetModal} alt='registration image verification' />
                <Heading
                    as='h2'
                    size='h2'
                    fontSize='24px'
                    lineHeight='32px'
                    fontWeight='700'
                    textAlign='center'
                    letterSpacing='0.5px'
                >
                    Вход не выполнен
                </Heading>
                <VStack gap={0}>
                    <Text fontSize='16px' color='rgba(0, 0, 0, 0.48)'>
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
