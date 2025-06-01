import {
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Image,
    Input,
    Text,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Alert } from '~/components/alert';
import { Loader } from '~/components/loader';
import {
    LoginCheckTextStyles,
    LoginDescriptionStyles,
    LoginInputStyles,
    loginModalContentStyles,
    loginModalWrapperStyles,
} from '~/components/Pages/Login/styles';
import { ForgetModalTexts } from '~/constants/LoginTextModals';
import { errorForgetModalMessage } from '~/constants/LoginTextModals/errorTextModals';
import { TEST_IDS } from '~/constants/testsIds';
import { useForgotPasswordMutation } from '~/query/services/post/regLog';
import { VerifyField } from '~/types/LoginTypes';
import { verifySchema } from '~/utils/validationRules/yupSheme';

import * as loginImgs from '../../../assets/LoginImg/index';
import closeBtn from '../../../assets/verificationCloseImg.svg';

export const ForgetModal = ({
    isOpen,
    onClose,
    onSuccess,
    setVerEmail,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    setVerEmail: (email: string) => void;
}) => {
    const [verifyEmail, { isSuccess, isError, error, isLoading }] = useForgotPasswordMutation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<VerifyField>({ mode: 'onChange', resolver: yupResolver(verifySchema) });
    useEffect(() => {
        if (isSuccess) {
            onClose();
            onSuccess();
        }
    }, [isSuccess, onClose, onSuccess]);
    const onSubmit: SubmitHandler<VerifyField> = (data) => {
        verifyEmail(data);
        setVerEmail(data.email);
        reset();
    };
    const closeHandle = () => {
        onClose();
        setVerEmail('');
        reset();
    };
    console.log();
    return isOpen ? (
        <Center {...loginModalWrapperStyles} data-test-id={TEST_IDS.SEND_EMAIL_MODAL}>
            <VStack w={{ lg: '332px', base: '316px' }} {...loginModalContentStyles}>
                <Image
                    src={loginImgs.forgetModal}
                    boxSize={{ lg: 'auto', base: '108px' }}
                    alt='forget modal img'
                />
                <Text {...LoginDescriptionStyles}>{ForgetModalTexts.description}</Text>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack gap='24px'>
                        <FormControl isInvalid={!!errors.email}>
                            <FormLabel>Ваш email</FormLabel>
                            <Input
                                data-test-id={TEST_IDS.EMAIL_INPUT}
                                {...LoginInputStyles}
                                {...register('email')}
                                placeholder='e-mail'
                                onBlur={(e) => (e.target.value = e.target.value.trim())}
                                borderColor={isError ? 'red' : '#d7ff94'}
                            />
                            <FormErrorMessage>
                                {errors.email && errors.email.message}
                            </FormErrorMessage>
                        </FormControl>
                        <Button
                            data-test-id={TEST_IDS.SUBMIT_BTN}
                            type='submit'
                            variant='commonLoginBtn'
                        >
                            Получить код
                        </Button>
                    </VStack>
                </form>
                <VStack gap={0}>
                    <Text {...LoginCheckTextStyles}>{ForgetModalTexts.check}</Text>
                </VStack>
                <Image
                    data-test-id={TEST_IDS.CLOSE_BTN}
                    position='absolute'
                    right='24px'
                    src={closeBtn}
                    alt='close img'
                    onClick={closeHandle}
                />
            </VStack>
            {isLoading && <Loader />}
            {isError && <Alert errorStatus={error.status} errorMessage={errorForgetModalMessage} />}
        </Center>
    ) : null;
};
