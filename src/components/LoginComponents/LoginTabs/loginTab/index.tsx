import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { LoginFormLabel, LoginInputStyles } from '~/components/Pages/Login/textStyles';
import { LoginFields } from '~/types/LoginTypes';
import { authLoginValidation, authPasswordValidation } from '~/utils/validationRules';

import { PasswordInput } from '../passwordInput';

export const LoginTab = () => {
    const {
        register,
        handleSubmit,
        formState: { isDirty, isValid, errors },
    } = useForm<LoginFields>({ mode: 'onChange' });
    const onSubmit: SubmitHandler<LoginFields> = (data) => {
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap='24px' mb='112px'>
                <FormControl isInvalid={!!errors.login}>
                    <FormLabel {...LoginFormLabel}>Логин для входа на сайт</FormLabel>
                    <Input
                        {...register('login', authLoginValidation)}
                        {...LoginInputStyles}
                        placeholder='Введите логин'
                    />
                    <FormErrorMessage> {errors.login && errors.login.message}</FormErrorMessage>
                </FormControl>
                <FormControl>
                    <PasswordInput
                        errors={errors.password}
                        {...register('password', authPasswordValidation)}
                    />
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
    );
};
