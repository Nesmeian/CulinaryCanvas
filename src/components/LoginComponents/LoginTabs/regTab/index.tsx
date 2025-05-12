import './style.css';

import { Button, FormControl, FormLabel, Input, Progress, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { PassWordInput } from '../passwordInput';
export const RegTab = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const steps = ['Шаг 1. Личная информация', 'Шаг 2. Логин и пароль'];
    return (
        <VStack width='100%'>
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
                    <form>
                        <FormControl>
                            <FormLabel>Ваше имя</FormLabel>
                            <Input placeholder='Имя' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Ваша фамилия</FormLabel>
                            <Input placeholder='Фамилия' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Ваш e-mail</FormLabel>
                            <Input type='email' placeholder='e-mail' />
                        </FormControl>
                        <Button variant='commonLoginBtn' className='btn-next'>
                            Дальше
                        </Button>
                    </form>
                </SwiperSlide>
                <SwiperSlide>
                    <form>
                        <FormControl>
                            <FormLabel>Логин для входа на сайт</FormLabel>
                            <Input placeholder='Логин' />
                        </FormControl>
                        <PassWordInput />
                        <PassWordInput repeat />
                        <Button variant='commonLoginBtn'>Зарегистрироваться</Button>
                    </form>
                </SwiperSlide>
            </Swiper>
        </VStack>
    );
};
