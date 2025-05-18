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

import {
    helperTextStyles,
    LoginFormLabel,
    LoginInputStyles,
} from '~/components/Pages/Login/styles';
import { TEST_IDS } from '~/constants/testsIds';
import { passwordInputType } from '~/types/LoginTypes';

import * as passwordIcons from '../../../../assets/passwordIcons/index';
export const PasswordInput = ({ repeat, errors, test, isLogin, ...rest }: passwordInputType) => {
    const fieldConfigs = {
        password: { title: 'Пароль', placeholder: 'Пароль для сайта' },
        rePassword: { title: 'Повторить пароль', placeholder: 'Повторить пароль для сайта' },
    } as const;
    const key = repeat ? 'rePassword' : 'password';
    const { title, placeholder } = fieldConfigs[key];
    const showPasswordMessage = { show: 'Скрыть пароль', hide: 'Показать пароль' };
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
                                alt={
                                    showPassword
                                        ? showPasswordMessage.hide
                                        : showPasswordMessage.show
                                }
                            />
                        }
                        aria-label={
                            showPassword ? showPasswordMessage.hide : showPasswordMessage.show
                        }
                        onMouseDown={() => setShowPassword(true)}
                        onMouseUp={() => setShowPassword(false)}
                        onMouseLeave={() => setShowPassword(false)}
                    />
                </InputRightElement>
            </InputGroup>
            {!isLogin && (
                <FormHelperText {...helperTextStyles}>
                    Пароль не менее 8 символов, с заглавной буквой и цифрой
                </FormHelperText>
            )}
            <FormErrorMessage>{errors && errors.message}</FormErrorMessage>
        </FormControl>
    );
};
