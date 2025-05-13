import './style.css';

import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Progress,
    Text,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { LoginFormLabel, LoginInputStyles } from '~/components/Pages/Login/textStyles';
import { RegFields } from '~/types/LoginTypes';
import { registrationProgress } from '~/utils/LoginPageUtils/RegistationProgress';
import { regSchema } from '~/utils/validationRules/yupSheme';

import { PasswordInput } from '../passwordInput';

export const RegTab = () => {
    const swiperRef = useRef<SwiperType>(null);
    const {
        register,
        handleSubmit,
        formState: { isDirty, isValid, errors },
        trigger,
        watch,
    } = useForm<RegFields>({
        mode: 'onChange',
        resolver: yupResolver(regSchema),
    });

    const onSubmit: SubmitHandler<RegFields> = (data) => {
        console.log(data);
    };
    const watchedValues = watch();
    const progressState = registrationProgress(watchedValues, errors);
    const steps = ['Шаг 1.Личная информация', 'Шаг 2. Логин и пароль'];
    const stepFields: Record<number, (keyof RegFields)[]> = {
        0: ['name', 'lastName', 'email'],
        1: ['login', 'password', 'rePassword'],
    };
    const [activeIndex, setActiveIndex] = useState(0);
    const handleNext = async () => {
        const valid = await trigger(stepFields[activeIndex]);
        if (valid) {
            swiperRef.current?.slideNext();
        }
    };
    const currentValues = watch(stepFields[activeIndex]) as (string | undefined)[];
    const noEmpty = currentValues.every((v) => typeof v === 'string' && v.trim() !== '');
    const noErrors = stepFields[activeIndex].every((f) => !errors[f]);
    const canProceed = noEmpty && noErrors;
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={0} mb='24px'>
                <Text w='100%'>{steps[activeIndex]}</Text>
                <Progress
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
                onSlideChange={(s) => setActiveIndex(s.activeIndex)}
            >
                <SwiperSlide>
                    <VStack gap={{ lg: '24px', base: '44px' }} mb='48px'>
                        <FormControl isInvalid={!!errors.name}>
                            <FormLabel {...LoginFormLabel}>Ваше имя</FormLabel>
                            <Input
                                placeholder='Имя'
                                {...LoginInputStyles}
                                {...register('name', { required: 'Ваше имя' })}
                            />
                            <FormErrorMessage>
                                {errors.name && errors.name?.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.lastName}>
                            <FormLabel {...LoginFormLabel}>Ваша фамилия</FormLabel>
                            <Input
                                placeholder='Фамилия'
                                {...LoginInputStyles}
                                {...register('lastName', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.lastName && errors.lastName?.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.email}>
                            <FormLabel {...LoginFormLabel}>Ваш e-mail</FormLabel>
                            <Input
                                type='email'
                                {...LoginInputStyles}
                                placeholder='e-mail'
                                {...register('email', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.email && errors.email?.message}
                            </FormErrorMessage>
                        </FormControl>
                    </VStack>
                    <Button
                        size='lg'
                        variant='commonLoginBtn'
                        onClick={handleNext}
                        isDisabled={!canProceed}
                    >
                        Дальше
                    </Button>
                </SwiperSlide>
                <SwiperSlide>
                    <VStack gap={{ lg: '24px', base: '44px' }} mb='28px'>
                        <FormControl isInvalid={!!errors.login}>
                            <FormLabel {...LoginFormLabel}>Логин для входа на сайт</FormLabel>
                            <Input
                                placeholder='Логин'
                                {...LoginInputStyles}
                                {...register('login', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.login && errors.login?.message}
                            </FormErrorMessage>
                        </FormControl>
                        <PasswordInput
                            errors={errors.password}
                            {...register('password', { required: true })}
                        />
                        <PasswordInput
                            errors={errors.rePassword}
                            repeat
                            {...register('rePassword', { required: true })}
                        />
                    </VStack>
                    <Button
                        size='lg'
                        variant='commonLoginBtn'
                        type='submit'
                        isDisabled={!isDirty || !isValid}
                    >
                        Зарегистрироваться
                    </Button>
                </SwiperSlide>
            </Swiper>
        </form>
    );
};
