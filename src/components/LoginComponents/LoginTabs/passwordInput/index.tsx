import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FieldError } from 'react-hook-form';

import { LoginFormLabel, LoginInputStyles } from '~/components/Pages/Login/textStyles';

import * as passwordIcons from '../../../../assets/passwordIcons/index';
export const PasswordInput = ({
    repeat,
    errors,
    ...rest
}: {
    errors?: FieldError;
    repeat?: boolean;
}) => {
    const title = !repeat ? 'Пароль' : 'Повторить пароль';
    const placeholder = !repeat ? 'Пароль для сайта' : 'Повторить пароль для сайта';
    const [showPassword, setShowPassword] = useState(false);
    const handleToggle = () => setShowPassword(!showPassword);
    return (
        <FormControl isInvalid={!!errors}>
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
                        _hover={{ background: 'none' }}
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
                    />
                </InputRightElement>
            </InputGroup>
            <FormErrorMessage> {errors && errors.message}</FormErrorMessage>
        </FormControl>
    );
};
