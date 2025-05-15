import { Center, HStack, Image, PinInput, PinInputField, Text, VStack } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Alert } from '~/components/alert';
import { Loader } from '~/components/loader';
import { useVerifyOtkMutation } from '~/query/services/post';
import { verifyCode } from '~/types/LoginTypes';

import closeBtn from '../../../assets/closeSvg.svg';
import * as loginImgs from '../../../assets/LoginImg/index';
export const SendForgetCodeModal = ({
    isOpen,
    onClose,
    onSuccess,
    email,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    email: string;
}) => {
    const [verifyOTK, { isLoading, isSuccess, isError, error }] = useVerifyOtkMutation();
    const formRef = useRef<HTMLFormElement>(null);
    const { control, handleSubmit } = useForm<verifyCode>();

    useEffect(() => {
        if (isSuccess) {
            onClose();
            onSuccess();
        }
    }, [isSuccess, onClose, onSuccess]);
    const onSubmit: SubmitHandler<verifyCode> = ({ otpToken }) => {
        const data = {
            email: email,
            otpToken: otpToken,
        };
        verifyOTK(data);
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
            >
                <Image src={loginImgs.sendForgetKey} alt='forget modal img' />
                <Text fontSize='16px' textAlign='center'>
                    Мы отправили вам на e-mail
                    <br />
                    <Text as='span' fontWeight='600' fontSize='16px'>
                        {email}
                    </Text>
                    <br />
                    шестизначный код. Введите его ниже.
                </Text>
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name='otpToken'
                        control={control}
                        rules={{ minLength: 6 }}
                        render={({ field }) => (
                            <HStack gap='6px'>
                                <PinInput
                                    size='md'
                                    otp
                                    onComplete={(value) => {
                                        field.onChange(value);
                                        formRef.current?.requestSubmit();
                                    }}
                                >
                                    {[...Array(6)].map((_, idx) => (
                                        <PinInputField key={idx} />
                                    ))}
                                </PinInput>
                            </HStack>
                        )}
                    />
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
    ) : null;
};
