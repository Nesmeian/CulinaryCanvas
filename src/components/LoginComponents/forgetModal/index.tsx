import {
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Image,
    Input,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Alert } from '~/components/alert';
import { Loader } from '~/components/loader';
import { LoginInputStyles } from '~/components/Pages/Login/textStyles';
import { useForgotPasswordMutation } from '~/query/services/post';
import { VerifyField } from '~/types/LoginTypes';
import { verifySchema } from '~/utils/validationRules/yupSheme';

import closeBtn from '../../../assets/closeSvg.svg';
import * as loginImgs from '../../../assets/LoginImg/index';
export const ForgetModal = () => {
    const [verifyEmail, { isSuccess, isError, error, isLoading }] = useForgotPasswordMutation();
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    const {
        register,
        handleSubmit,
        formState: { isDirty, isValid, errors },
    } = useForm<VerifyField>({ mode: 'onChange', resolver: yupResolver(verifySchema) });
    const onSubmit: SubmitHandler<VerifyField> = (data) => {
        verifyEmail(data);
    };
    if (!isOpen) {
        return null;
    }
    return (
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
                w='332px'
                background='white'
                borderRadius='16px'
                p='32px'
                gap='24px'
                position='relative'
            >
                <Image src={loginImgs.forgetModal} alt='forget modal img' />
                <Text fontSize='16px' textAlign='center'>
                    Для восстановления входа введите ваш e-mail, куда можно отправить уникальный код
                </Text>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack gap='24px'>
                        <FormControl isInvalid={!!errors.email}>
                            <FormLabel>Ваш email</FormLabel>
                            <Input
                                {...LoginInputStyles}
                                {...register('email')}
                                placeholder='e-mail'
                                borderColor={isError ? 'red' : '#d7ff94'}
                            />
                            <FormErrorMessage>
                                {errors.email && errors.email.message}
                            </FormErrorMessage>
                        </FormControl>
                        <Button
                            type='submit'
                            variant='commonLoginBtn'
                            isDisabled={!isDirty || !isValid}
                        >
                            Получить код
                        </Button>
                    </VStack>
                </form>
                <VStack gap={0}>
                    <Text fontSize='12px' color='rgba(0, 0, 0, 0.48)'>
                        Не пришло письмо? Проверьте папку Спам.
                    </Text>
                </VStack>
                <Image
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
    );
};
