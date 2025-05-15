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
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';

import { Alert } from '~/components/alert';
import { Loader } from '~/components/loader';
import { LoginFormLabel, LoginInputStyles } from '~/components/Pages/Login/textStyles';
import { usePostAuthLoginMutation } from '~/query/services/post';
import { LoginFields } from '~/types/LoginTypes';
import { loginSchema } from '~/utils/validationRules/yupSheme';

import { ForgetModal } from '../../forgetModal';
import { ResetPasswordModal } from '../../resetPassword';
import { SendForgetCodeModal } from '../../sendForgetCode';
import { PasswordInput } from '../passwordInput';

export const LoginTab = () => {
    const [postAuthLogin, { isLoading, isSuccess, isError, error }] = usePostAuthLoginMutation();
    const { isOpen: isForgetOpen, onOpen: openForget, onClose: closeForget } = useDisclosure();
    const { isOpen: isSendOpen, onOpen: openSend, onClose: closeSend } = useDisclosure();
    const { isOpen: isResetOpen, onOpen: openReset, onClose: closeReset } = useDisclosure();
    const [verEmail, setVerEmail] = useState('');
    const location = useLocation();
    const isEmailVerified = location.state?.emailVerified;
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { isDirty, isValid, errors },
    } = useForm<LoginFields>({ mode: 'onChange', resolver: yupResolver(loginSchema) });
    const onSubmit: SubmitHandler<LoginFields> = (data) => {
        postAuthLogin(data);
    };
    useEffect(() => {
        if (isSuccess) {
            navigate('/', { replace: true });
        }
    }, [isSuccess, navigate]);
    return (
        <VStack>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap='24px' mb='112px'>
                    <FormControl isInvalid={!!errors.login}>
                        <FormLabel {...LoginFormLabel}>Логин для входа на сайт</FormLabel>
                        <Input
                            {...register('login')}
                            {...LoginInputStyles}
                            placeholder='Введите логин'
                        />
                        <FormErrorMessage> {errors.login && errors.login.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl>
                        <PasswordInput errors={errors.password} {...register('password')} />
                    </FormControl>
                </VStack>
                <Button
                    size='lg'
                    variant='commonLoginBtn'
                    type='submit'
                    isDisabled={!isDirty || !isValid}
                >
                    Войти
                </Button>
                <Button size='lg' width='100%' variant='plain' onClick={openForget}>
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
            <ResetPasswordModal isOpen={isResetOpen} onClose={closeReset} />
            {isLoading && <Loader />}
            {isEmailVerified && <Alert isSuccessVerification />}
            {isError && <Alert error={error.data.message} />}
        </VStack>
    );
};
