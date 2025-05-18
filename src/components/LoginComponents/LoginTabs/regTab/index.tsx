import './style.css';

import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    Progress,
    Text,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation } from 'react-router';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Alert } from '~/components/alert';
import { Loader } from '~/components/loader';
import {
    helperTextStyles,
    LoginFormLabel,
    LoginInputStyles,
} from '~/components/Pages/Login/textStyles';
import { TEST_IDS } from '~/constants/testsIds';
import { usePostAuthSignUpMutation } from '~/query/services/post';
import { RegFields } from '~/types/LoginTypes';
import { handleTrimBlur } from '~/utils/LoginPageUtils/handleTrimBlur';
import { registrationProgress } from '~/utils/LoginPageUtils/RegistationProgress';
import { regSchema } from '~/utils/validationRules/yupSheme';

import { EmailVerificationFailed } from '../../emailVeritification/verificationFailed';
import { EmailVerificationSuccess } from '../../emailVeritification/verificationSuccess';
import { PasswordInput } from '../passwordInput';
const steps = ['Шаг 1.Личная информация', 'Шаг 2. Логин и пароль'];
const stepFields: Record<number, (keyof RegFields)[]> = {
    0: ['firstName', 'lastName', 'email'],
    1: ['login', 'password', 'rePassword'],
};
export const RegTab = () => {
    const [postAuthSignUp, { isLoading, isError, error, isSuccess }] = usePostAuthSignUpMutation();
    const [verEmail, setVerEmail] = useState('');
    const swiperRef = useRef<SwiperType>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        watch,
    } = useForm<RegFields>({
        mode: 'onChange',
        resolver: yupResolver(regSchema),
    });

    const onSubmit: SubmitHandler<RegFields> = (data) => {
        const { rePassword, ...dataToSend } = data;
        setVerEmail(data.email);
        postAuthSignUp(dataToSend);
    };
    const watchedValues = watch();
    const progressState = registrationProgress(watchedValues, errors);

    const [activeIndex, setActiveIndex] = useState(0);
    const handleNext = async () => {
        const valid = await trigger(stepFields[activeIndex]);
        if (valid) {
            swiperRef.current?.slideNext();
        }
    };
    const location = useLocation();
    const isEmailVerified = location.state?.emailVerified;
    return (
        <VStack>
            <form
                onSubmit={handleSubmit(onSubmit)}
                data-test-id={TEST_IDS.SIGN_UP_FORM}
                className='registration_form'
            >
                <VStack gap={0} mb='24px' width='100%'>
                    <Text w='100%'>{steps[activeIndex]}</Text>
                    <Progress
                        data-test-id={TEST_IDS.SIGN_UP_PROGRESS}
                        value={progressState}
                        w='100%'
                        h='8px'
                        background=' rgba(0, 0, 0, 0.06)'
                        colorScheme='progressColor'
                    />
                </VStack>
                <Swiper
                    modules={[Navigation]}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    navigation={false}
                    allowTouchMove={false}
                    spaceBetween={2}
                    onSlideChange={(s) => setActiveIndex(s.activeIndex)}
                >
                    <SwiperSlide>
                        <VStack gap='24px' mb='48px'>
                            <FormControl isInvalid={!!errors.firstName}>
                                <FormLabel {...LoginFormLabel}>Ваше имя</FormLabel>
                                <Input
                                    data-test-id={TEST_IDS.FIRST_NAME_INPUT}
                                    placeholder='Имя'
                                    {...LoginInputStyles}
                                    {...register('firstName', { required: 'Ваше имя' })}
                                    onBlur={(e) => handleTrimBlur(e)}
                                />
                                <FormErrorMessage>
                                    {errors.firstName && errors.firstName?.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.lastName}>
                                <FormLabel {...LoginFormLabel}>Ваша фамилия</FormLabel>
                                <Input
                                    data-test-id={TEST_IDS.LAST_NAME_INPUT}
                                    placeholder='Фамилия'
                                    {...LoginInputStyles}
                                    {...register('lastName')}
                                    onBlur={(e) => handleTrimBlur(e)}
                                />
                                <FormErrorMessage>
                                    {errors.lastName && errors.lastName?.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.email}>
                                <FormLabel {...LoginFormLabel}>Ваш e-mail</FormLabel>
                                <Input
                                    data-test-id={TEST_IDS.EMAIL_INPUT}
                                    type='email'
                                    {...LoginInputStyles}
                                    placeholder='e-mail'
                                    {...register('email')}
                                />
                                <FormErrorMessage>
                                    {errors.email && errors.email?.message}
                                </FormErrorMessage>
                            </FormControl>
                        </VStack>
                        <Button
                            data-test-id={activeIndex === 0 ? TEST_IDS.SUBMIT_BTN : ''}
                            size='lg'
                            variant='commonLoginBtn'
                            onClick={handleNext}
                        >
                            Дальше
                        </Button>
                    </SwiperSlide>
                    <SwiperSlide>
                        <VStack gap='24px' mb='28px'>
                            <FormControl isInvalid={!!errors.login}>
                                <FormLabel {...LoginFormLabel}>Логин для входа на сайт</FormLabel>
                                <Input
                                    data-test-id={TEST_IDS.LOGIN_INPUT}
                                    placeholder='Логин'
                                    {...LoginInputStyles}
                                    {...register('login')}
                                />
                                <FormHelperText {...helperTextStyles}>
                                    Логин не менее 5 символов, только латиница
                                </FormHelperText>
                                <FormErrorMessage>
                                    {errors.login && errors.login?.message}
                                </FormErrorMessage>
                            </FormControl>
                            <PasswordInput
                                test={TEST_IDS.PASSWORD}
                                errors={errors.password}
                                {...register('password')}
                            />
                            <PasswordInput
                                test={TEST_IDS.CONFIRM_PASSWORD}
                                errors={errors.rePassword}
                                repeat
                                {...register('rePassword')}
                            />
                        </VStack>
                        <Button
                            data-test-id={activeIndex === 1 ? TEST_IDS.SUBMIT_BTN : ''}
                            size='lg'
                            variant='commonLoginBtn'
                            type='submit'
                        >
                            Зарегистрироваться
                        </Button>
                    </SwiperSlide>
                </Swiper>
            </form>
            {isLoading && <Loader />}
            {isError && <Alert errorStatus={error.status} errorData={error.data.message} />}
            {isSuccess && <EmailVerificationSuccess email={verEmail} />}
            {isEmailVerified == false && <EmailVerificationFailed />}
        </VStack>
    );
};
