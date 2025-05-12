import './style.css';

import { Button, FormControl, FormLabel, Input, Progress, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { LoginFormLabel, LoginInputStyles } from '~/components/Pages/Login/textStyles';
import { RegFields } from '~/types/LoginTypes';
import { registrationProgress } from '~/utils/LoginPageUtils/RegistationProgress';

import { PasswordInput } from '../passwordInput';

export const RegTab = () => {
    const {
        register,
        handleSubmit,
        formState: { isDirty, isValid },
        watch,
    } = useForm<RegFields>({
        mode: 'onChange',
        defaultValues: {
            name: '',
            lastName: '',
            email: '',
            login: '',
            password: '',
            rePassword: '',
        },
    });
    const [activeIndex, setActiveIndex] = useState(0);
    const onSubmit: SubmitHandler<RegFields> = (data) => {
        console.log(data);
    };
    const watchedValues = watch();
    const progressState = registrationProgress(watchedValues);
    const steps = ['Шаг 1.Личная информация', 'Шаг 2. Логин и пароль'];
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
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                modules={[Navigation]}
                allowTouchMove={false}
                className='swiper__list'
                navigation={{ nextEl: '.btn-next' }}
            >
                <SwiperSlide>
                    <VStack gap='24px' mb='48px'>
                        <FormControl>
                            <FormLabel {...LoginFormLabel}>Ваше имя</FormLabel>
                            <Input
                                placeholder='Имя'
                                {...LoginInputStyles}
                                {...register('name', { required: true })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel {...LoginFormLabel}>Ваша фамилия</FormLabel>
                            <Input
                                placeholder='Фамилия'
                                {...LoginInputStyles}
                                {...register('lastName', { required: true })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel {...LoginFormLabel}>Ваш e-mail</FormLabel>
                            <Input
                                type='email'
                                {...LoginInputStyles}
                                placeholder='e-mail'
                                {...register('email', { required: true })}
                            />
                        </FormControl>
                    </VStack>
                    <Button size='lg' variant='commonLoginBtn' className='btn-next'>
                        Дальше
                    </Button>
                </SwiperSlide>
                <SwiperSlide>
                    <VStack gap='24px' mb='28px'>
                        <FormControl>
                            <FormLabel {...LoginFormLabel}>Логин для входа на сайт</FormLabel>
                            <Input
                                placeholder='Логин'
                                {...LoginInputStyles}
                                {...register('login', { required: true })}
                            />
                        </FormControl>
                        <PasswordInput {...register('password', { required: true })} />
                        <PasswordInput repeat {...register('rePassword', { required: true })} />
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
