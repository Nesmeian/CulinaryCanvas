import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';

import { Alert } from '~/components/alert';
import { Loader } from '~/components/loader';
import { LoginFormLabel, LoginInputStyles } from '~/components/Pages/Login/textStyles';
import { usePostAuthLoginMutation } from '~/query/services/post';
import { LoginFields } from '~/types/LoginTypes';
import { loginSchema } from '~/utils/validationRules/yupSheme';

import { ForgetModal } from '../../forgetModal';
import { PasswordInput } from '../passwordInput';

export const LoginTab = () => {
    const [postAuthLogin, { isLoading, isSuccess, isError, error }] = usePostAuthLoginMutation();

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
                <Button size='lg' width='100%' variant='plain'>
                    Забыли логин или пароль?
                </Button>
            </form>
            <ForgetModal />
            {isLoading && <Loader />}
            {isEmailVerified && <Alert isSuccessVerification />}
            {isError && <Alert error={error.data.message} />}
        </VStack>
    );
};
