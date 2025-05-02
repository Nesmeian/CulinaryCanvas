import './style.css';

import { Heading, Image, Text, VStack } from '@chakra-ui/react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useFilteredOnDataRecipes } from '~/Hooks/useGetRecipesForData';

import * as sliderArrows from '../../assets/sliderArrows/index';
import { SlideItem } from './sliderItem';

export default function Slider({ isRecipePage }: { isRecipePage?: boolean }) {
    const { data: recipes, loading } = useFilteredOnDataRecipes();
    if (loading) {
        return <Text>Loading</Text>;
    } else {
        console.log(recipes);
    }
    return (
        <VStack
            align='flex-start'
            className='slider'
            as='section'
            width='100%'
            pb={isRecipePage ? { lg: '0', base: '116px' } : '0px'}
        >
            <Heading as='h2' size='h2' className='slider__title'>
                Новые рецепты
            </Heading>
            <Swiper
                data-test-id='carousel'
                className='slider__list'
                modules={[Navigation]}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                loop
                breakpoints={{
                    1920: { slidesPerView: 4, spaceBetween: 24 },
                    1440: { slidesPerView: 3, spaceBetween: 20 },
                    768: { slidesPerView: 4, spaceBetween: 16 },
                    360: { slidesPerView: 2, spaceBetween: 8 },
                }}
            >
                {recipes?.data.map((recipe, i) => (
                    <SwiperSlide
                        key={recipe._id}
                        className='slider__item'
                        data-test-id={`carousel-card-${i}`}
                    >
                        <SlideItem key={recipe._id} index={i} recipe={recipe} />
                    </SwiperSlide>
                ))}
                <Image
                    src={sliderArrows.leftArrow}
                    className='swiper-button-prev'
                    data-test-id='carousel-back'
                />
                <Image
                    src={sliderArrows.rightArrow}
                    className='swiper-button-next'
                    data-test-id='carousel-forward'
                />
            </Swiper>
        </VStack>
    );
}
