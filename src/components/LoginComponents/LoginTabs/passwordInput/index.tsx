import {
    FormControl,
    FormLabel,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';

import { LoginFormLabel, LoginInputStyles } from '~/components/Pages/Login/textStyles';

import * as passwordIcons from '../../../../assets/passwordIcons/index';
export const PasswordInput = ({ repeat, ...rest }: { repeat?: boolean }) => {
    const title = !repeat ? 'Пароль' : 'Повторить пароль';
    const placeholder = !repeat ? 'Пароль для сайта' : 'Повторить пароль для сайта';
    const [showPassword, setShowPassword] = useState(false);
    const handleToggle = () => setShowPassword(!showPassword);
    return (
        <FormControl>
            <FormLabel {...LoginFormLabel}>{title}</FormLabel>
            <InputGroup size='lg'>
                <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    {...LoginInputStyles}
                    {...rest}
                />
                <InputRightElement>
                    <IconButton
                        background='white'
                        icon={
                            <Image
                                src={
                                    showPassword
                                        ? passwordIcons.showPassword
                                        : passwordIcons.hidePassword
                                }
                            />
                        }
                        aria-label={showPassword ? 'Скрыть пароль' : 'показать пароль'}
                        onClick={handleToggle}
                    ></IconButton>
                </InputRightElement>
            </InputGroup>
        </FormControl>
    );
};
