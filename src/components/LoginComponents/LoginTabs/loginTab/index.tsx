import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

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
            <FormControl>
                <FormLabel>Логин для входа на сайт</FormLabel>
                <Input
                    {...register('login', { required: true })}
                    placeholder='Введите логин'
                    background='black'
                />
            </FormControl>
            <FormControl>
                <PasswordInput {...register('password', { required: true })} />
            </FormControl>
            <Button variant='commonLoginBtn' type='submit' isDisabled={!isDirty || !isValid}>
                Войти
            </Button>
            <Button width='100%' variant='plain'>
                Забыли логин или пароль?
            </Button>
        </form>
    );
};
