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

import * as passwordIcons from '../../../../assets/passwordIcons/index';
export const PassWordInput = ({ repeat }: { repeat?: boolean }) => {
    const title = !repeat ? 'Повторить пароль' : 'Пароль';
    const placeholder = !repeat ? 'Пароль для сайта' : 'Повторить пароль для сайта';
    const [showPassword, setShowPassword] = useState(false);
    const handleToggle = () => setShowPassword(!showPassword);
    return (
        <FormControl>
            <FormLabel>{title}</FormLabel>
            <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} placeholder={placeholder} />
                <InputRightElement>
                    <IconButton
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
