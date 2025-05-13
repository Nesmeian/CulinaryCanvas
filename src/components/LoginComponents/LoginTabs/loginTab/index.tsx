import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation } from 'react-router';

import { Alert } from '~/components/alert';
import { LoginFormLabel, LoginInputStyles } from '~/components/Pages/Login/textStyles';
import { LoginFields } from '~/types/LoginTypes';
import { loginSchema } from '~/utils/validationRules/yupSheme';

import { PasswordInput } from '../passwordInput';

export const LoginTab = () => {
    const location = useLocation();
    const isEmailVerified =
        location.state && location?.state.emailVerified ? location?.state.emailVerified : '';
    const {
        register,
        handleSubmit,
        formState: { isDirty, isValid, errors },
    } = useForm<LoginFields>({ mode: 'onChange', resolver: yupResolver(loginSchema) });
    const onSubmit: SubmitHandler<LoginFields> = (data) => {
        console.log(data);
    };
    console.log(location);
    return (
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
            {isEmailVerified && <Alert isSuccessVerification />}
        </form>
    );
};
