import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { LoginFormLabel, LoginInputStyles } from '~/components/Pages/Login/textStyles';
import { LoginFields } from '~/types/LoginTypes';

import { PasswordInput } from '../passwordInput';

export const LoginTab = () => {
    const {
        register,
        handleSubmit,
        formState: { isDirty, isValid },
    } = useForm<LoginFields>({ mode: 'onChange' });
    const onSubmit: SubmitHandler<LoginFields> = (data) => {
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap='24px' mb='112px'>
                <FormControl>
                    <FormLabel {...LoginFormLabel}>Логин для входа на сайт</FormLabel>
                    <Input
                        {...register('login', { required: true })}
                        {...LoginInputStyles}
                        placeholder='Введите логин'
                    />
                </FormControl>
                <FormControl>
                    <PasswordInput {...register('password', { required: true })} />
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
