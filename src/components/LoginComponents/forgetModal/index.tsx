import {
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Image,
    Input,
    Text,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Alert } from '~/components/alert';
import { Loader } from '~/components/loader';
import { LoginInputStyles } from '~/components/Pages/Login/textStyles';
import { TEST_IDS } from '~/constants/testsIds';
import { useForgotPasswordMutation } from '~/query/services/post';
import { VerifyField } from '~/types/LoginTypes';
import { verifySchema } from '~/utils/validationRules/yupSheme';

import * as loginImgs from '../../../assets/LoginImg/index';
import closeBtn from '../../../assets/verificationCloseImg.svg';
export const ForgetModal = ({
    isOpen,
    onClose,
    onSuccess,
    setVerEmail,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    setVerEmail: (email: string) => void;
}) => {
    const [verifyEmail, { isSuccess, isError, error, isLoading }] = useForgotPasswordMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<VerifyField>({ mode: 'onChange', resolver: yupResolver(verifySchema) });
    useEffect(() => {
        if (isSuccess) {
            onClose();
            onSuccess();
        }
    }, [isSuccess, onClose, onSuccess]);
    const onSubmit: SubmitHandler<VerifyField> = (data) => {
        verifyEmail(data);
        setVerEmail(data.email);
        reset();
    };
    const closeHandle = () => {
        onClose();
        setVerEmail('');
        reset();
    };
    const errorMessage = {
        403: {
            title: 'Такого e-mail нет',
            description: 'Попробуйте другой e-mail или проверьте правильность его написания',
        },
        500: {
            title: 'Ошибка сервера',
            description: 'Попробуйте немного позже',
        },
    };
    return isOpen ? (
        <Center
            data-test-id={TEST_IDS.SEND_EMAIL_MODAL}
            h='100vh'
            w='100vw'
            bg='rgba(0, 0, 0, 0.7)'
            position='fixed'
            top={0}
            left={0}
            zIndex={9999}
        >
            <VStack
                w='332px'
                background='white'
                borderRadius='16px'
                p='32px'
                gap='24px'
                position='relative'
            >
                <Image src={loginImgs.forgetModal} alt='forget modal img' />
                <Text fontSize='16px' textAlign='center'>
                    Для восстановления входа введите ваш e-mail, куда можно отправить уникальный код
                </Text>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack gap='24px'>
                        <FormControl isInvalid={!!errors.email}>
                            <FormLabel>Ваш email</FormLabel>
                            <Input
                                data-test-id={TEST_IDS.EMAIL_INPUT}
                                {...LoginInputStyles}
                                {...register('email')}
                                placeholder='e-mail'
                                onBlur={(e) => (e.target.value = e.target.value.trim())}
                                borderColor={isError ? 'red' : '#d7ff94'}
                            />
                            <FormErrorMessage>
                                {errors.email && errors.email.message}
                            </FormErrorMessage>
                        </FormControl>
                        <Button
                            data-test-id={TEST_IDS.SUBMIT_BTN}
                            type='submit'
                            variant='commonLoginBtn'
                        >
                            Получить код
                        </Button>
                    </VStack>
                </form>
                <VStack gap={0}>
                    <Text fontSize='12px' color='rgba(0, 0, 0, 0.48)'>
                        Не пришло письмо? Проверьте папку Спам.
                    </Text>
                </VStack>
                <Image
                    data-test-id={TEST_IDS.CLOSE_BTN}
                    position='absolute'
                    right='24px'
                    src={closeBtn}
                    alt='close img'
                    onClick={closeHandle}
                />
            </VStack>
            {isLoading && <Loader />}
            {isError && <Alert errorStatus={error.status} errorMessage={errorMessage} />}
        </Center>
    ) : null;
};
