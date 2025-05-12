import './style.css';

import { Button, FormControl, FormLabel, Input, Progress, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { PasswordInput } from '../passwordInput';
type RegFields = {
    name: string;
    lastName: string;
    email: string;
    login: string;
    password: string;
    rePassword: string;
};
export const RegTab = () => {
    const {
        register,
        handleSubmit,
        formState: { isDirty, isValid },
    } = useForm<RegFields>({ mode: 'onChange' });
    const [activeIndex, setActiveIndex] = useState(0);
    const onSubmit: SubmitHandler<RegFields> = (data) => {
        console.log(data);
    };
    const steps = ['Шаг 1. Личная информация', 'Шаг 2. Логин и пароль'];
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>
                <Text>{steps[activeIndex]}</Text>
                <Progress
                    value={40}
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
                    <FormControl>
                        <FormLabel>Ваше имя</FormLabel>
                        <Input placeholder='Имя' {...register('name', { required: true })} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Ваша фамилия</FormLabel>
                        <Input
                            placeholder='Фамилия'
                            {...register('lastName', { required: true })}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Ваш e-mail</FormLabel>
                        <Input
                            type='email'
                            placeholder='e-mail'
                            {...register('email', { required: true })}
                        />
                    </FormControl>
                    <Button variant='commonLoginBtn' className='btn-next'>
                        Дальше
                    </Button>
                </SwiperSlide>
                <SwiperSlide>
                    <FormControl>
                        <FormLabel>Логин для входа на сайт</FormLabel>
                        <Input placeholder='Логин' {...register('login', { required: true })} />
                    </FormControl>
                    <PasswordInput {...register('password', { required: true })} />
                    <PasswordInput repeat {...register('rePassword', { required: true })} />
                    <Button
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
