import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
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
import { TEST_IDS } from '~/constants/testsIds';

import * as passwordIcons from '../../../../assets/passwordIcons/index';
export const PasswordInput = ({
    repeat,
    errors,
    test,
    ...rest
}: {
    test: string;
    errors?: FieldError;
    repeat?: boolean;
}) => {
    const title = !repeat ? 'Пароль' : 'Повторить пароль';
    const placeholder = !repeat ? 'Пароль для сайта' : 'Повторить пароль для сайта';
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormControl isInvalid={!!errors}>
            <FormLabel {...LoginFormLabel}>{title}</FormLabel>
            <InputGroup size='lg'>
                <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    {...LoginInputStyles}
                    {...rest}
                    data-test-id={test}
                />
                <InputRightElement>
                    <IconButton
                        data-test-id={TEST_IDS.PASSWORD_VISIBILITY_BTN}
                        background='white'
                        _hover={{ background: 'none' }}
                        icon={
                            <Image
                                src={
                                    showPassword
                                        ? passwordIcons.showPassword
                                        : passwordIcons.hidePassword
                                }
                                alt={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                            />
                        }
                        aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                        onMouseDown={() => setShowPassword(true)}
                        onMouseUp={() => setShowPassword(false)}
                        onMouseLeave={() => setShowPassword(false)}
                    />
                </InputRightElement>
            </InputGroup>
            <FormHelperText>Пароль не менее 8 символов, с заглавной буквой и цифрой</FormHelperText>
            <FormErrorMessage>{errors && errors.message}</FormErrorMessage>
        </FormControl>
    );
};
