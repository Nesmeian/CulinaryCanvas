import {
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Heading,
    Image,
    Input,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Alert } from '~/components/alert';
import { Loader } from '~/components/loader';
import { LoginInputStyles } from '~/components/Pages/Login/textStyles';
import { TEST_IDS } from '~/constants/testsIds';
import { useResetPasswordMutation } from '~/query/services/post';
import { ResetPasswordType } from '~/types/LoginTypes';
import { resetPasswordSchema } from '~/utils/validationRules/yupSheme';

import closeBtn from '../../../assets/closeSvg.svg';
import { PasswordInput } from '../LoginTabs/passwordInput';
export const ResetPasswordModal = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const [resetPassword, { isSuccess, isLoading, isError, error }] = useResetPasswordMutation();
    const {
        register,
        handleSubmit,
        formState: { isDirty, isValid, errors },
    } = useForm<ResetPasswordType>({
        mode: 'onChange',
        resolver: yupResolver(resetPasswordSchema),
    });
    if (isSuccess) {
        return <Alert isSuccessVerification />;
    }
    const onSubmit: SubmitHandler<ResetPasswordType> = (data) => {
        resetPassword(data);
    };

    return isOpen ? (
        <Center
            h='100vh'
            w='100vw'
            bg='rgba(0, 0, 0, 0.7)'
            position='fixed'
            top={0}
            left={0}
            zIndex={9999}
        >
            <VStack
                w='396px'
                background='white'
                borderRadius='16px'
                p='32px'
                gap='24px'
                position='relative'
                data-test-id={TEST_IDS.RESET_CREDENTIALS_MODAL}
            >
                <Heading fontSize='24px' fontWeight='700' textAlign='center'>
                    Восстановление <br /> аккаунта
                </Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack gap='24px'>
                        <FormControl isInvalid={!!errors.login}>
                            <FormLabel>Логин для входа на сайт</FormLabel>
                            <Input
                                data-test-id={TEST_IDS.LOGIN_INPUT}
                                {...LoginInputStyles}
                                {...register('login')}
                                placeholder='Введите Логин'
                                borderColor={isError ? 'red' : '#d7ff94'}
                            />
                            <FormHelperText>
                                Логин не менее 5 символов, только латиница
                            </FormHelperText>
                            <FormErrorMessage>
                                {errors.login && errors.login.message}
                            </FormErrorMessage>
                        </FormControl>
                        <PasswordInput
                            test={TEST_IDS.PASSWORD}
                            errors={errors.password}
                            {...register('password')}
                        />
                        <PasswordInput
                            test={TEST_IDS.CONFIRM_PASSWORD}
                            errors={errors.passwordConfirm}
                            repeat
                            {...register('passwordConfirm')}
                        />
                        <Button
                            data-test-id={TEST_IDS.SUBMIT_BTN}
                            type='submit'
                            variant='commonLoginBtn'
                            isDisabled={!isDirty || !isValid}
                        >
                            Получить код
                        </Button>
                    </VStack>
                </form>
                <Image
                    data-test-id={TEST_IDS.CLOSE_BTN}
                    position='absolute'
                    right='24px'
                    src={closeBtn}
                    alt='close img'
                    onClick={onClose}
                />
            </VStack>
            {isLoading && <Loader />}
            {isError && <Alert error={error.data.message} />}
            {isSuccess && <Alert isSuccessVerification />}
        </Center>
    ) : null;
};
