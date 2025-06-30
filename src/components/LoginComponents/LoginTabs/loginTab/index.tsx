import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { Alert } from '~/components/alert';
import { Loader } from '~/components/loader';
import { TEST_IDS } from '~/constants/testsIds';
import { LoginFormLabel, LoginInputStyles } from '~/Pages/Login/styles';
import { useCheckAuthTokenQuery } from '~/query/services/get/getAuthToken';
import { usePostAuthLoginMutation } from '~/query/services/post/regLog';
import { LoginFields } from '~/types/LoginTypes';
import { handleTrimBlur } from '~/utils/LoginPageUtils/handleTrimBlur';
import { loginSchema } from '~/utils/validationRules/yupSheme';

import { ErrorServerModal } from '../../errorServerModal';
import { ForgetModal } from '../../forgetModal';
import { ResetPasswordModal } from '../../resetPassword';
import { SendForgetCodeModal } from '../../sendForgetCode';
import { PasswordInput } from '../passwordInput';

export const LoginTab = () => {
    const [postAuthLogin, { isLoading, isSuccess, isError, error }] = usePostAuthLoginMutation();
    const { data: _check, refetch } = useCheckAuthTokenQuery(isSuccess ? undefined : skipToken, {
        skip: !isSuccess,
    });

    const { isOpen: isForgetOpen, onOpen: openForget, onClose: closeForget } = useDisclosure();
    const { isOpen: isSendOpen, onOpen: openSend, onClose: closeSend } = useDisclosure();
    const { isOpen: isResetOpen, onOpen: openReset, onClose: closeReset } = useDisclosure();

    const [verEmail, setVerEmail] = useState('');
    const [sendData, setSendData] = useState<LoginFields | []>([]);
    const location = useLocation();
    const isEmailVerified = location.state?.emailVerified;
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFields>({ mode: 'onChange', resolver: yupResolver(loginSchema) });
    const onSubmit: SubmitHandler<LoginFields> = async (data) => {
        try {
            await postAuthLogin(data).unwrap();
            await refetch();
            setSendData([]);
        } catch (err) {
            console.error('Login failed:', err);
        }
    };
    useEffect(() => {
        if (isSuccess) {
            navigate('/', { replace: true });
        }
    }, [isSuccess, navigate]);
    return (
        <VStack>
            <form onSubmit={handleSubmit(onSubmit)} data-test-id={TEST_IDS.SING_IN}>
                <VStack gap='24px' mb='112px'>
                    <FormControl isInvalid={!!errors.login}>
                        <FormLabel {...LoginFormLabel}>Логин для входа на сайт</FormLabel>
                        <Input
                            {...register('login')}
                            {...LoginInputStyles}
                            data-test-id={TEST_IDS.LOGIN_INPUT}
                            onBlur={(e) => handleTrimBlur(e)}
                            placeholder='Введите логин'
                        />
                        <FormErrorMessage> {errors.login && errors.login.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl>
                        <PasswordInput
                            test={TEST_IDS.PASSWORD}
                            errors={errors.password}
                            isLogin
                            {...register('password')}
                        />
                    </FormControl>
                </VStack>
                <Button
                    data-test-id={TEST_IDS.SUBMIT_BTN}
                    size='lg'
                    variant='commonLoginBtn'
                    type='submit'
                >
                    Войти
                </Button>
                <Button
                    size='lg'
                    width='100%'
                    variant='plain'
                    onClick={openForget}
                    data-test-id={TEST_IDS.FORGOT_PASSWORD}
                >
                    Забыли логин или пароль?
                </Button>
            </form>

            <ForgetModal
                isOpen={isForgetOpen}
                onClose={closeForget}
                onSuccess={openSend}
                setVerEmail={setVerEmail}
            />
            <SendForgetCodeModal
                isOpen={isSendOpen}
                onClose={closeSend}
                onSuccess={openReset}
                email={verEmail}
            />

            <ResetPasswordModal isOpen={isResetOpen} onClose={closeReset} email={verEmail} />
            {isLoading && <Loader />}
            {isEmailVerified && (
                <Alert isSuccessCheck successMessage='Верификация прошла успешно' />
            )}
            {isError ? (
                error.status !== 500 ? (
                    <Alert errorStatus={error.status} />
                ) : (
                    <ErrorServerModal repeatSend={sendData} />
                )
            ) : null}
        </VStack>
    );
};
