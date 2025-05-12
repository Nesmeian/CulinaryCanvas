import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

import { PassWordInput } from '../passwordInput';

export const LoginTab = () => (
    <form>
        <FormControl>
            <FormLabel>Логин для входа на сайт</FormLabel>
            <Input placeholder='Введите логин' background='black' />
        </FormControl>
        <FormControl>
            <PassWordInput />
        </FormControl>
        <Button variant='commonLoginBtn'> Войти</Button>
        <Button width='100%' variant='plain'>
            Забыли логин или пароль?
        </Button>
    </form>
);
