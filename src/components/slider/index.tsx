import './style.css';

import { Heading, Image, VStack } from '@chakra-ui/react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { TEST_IDS } from '~/constants/testsIds';
import { useFilteredOnDataRecipes } from '~/Hooks/useGetRecipesForData';

import * as sliderArrows from '../../assets/sliderArrows/index';
import { Loader } from '../loader';
import { SlideItem } from './sliderItem';

export default function Slider({ isRecipePage }: { isRecipePage?: boolean }) {
    const { data: recipes, loading } = useFilteredOnDataRecipes();

    if (loading) {
        return <Loader />;
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
                data-test-id={TEST_IDS.CAROUSEL}
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
                {recipes &&
                    recipes.data.map((recipe, i) => (
                        <SwiperSlide key={recipe._id} className='slider__item'>
                            <SlideItem key={recipe._id} index={i} recipe={recipe} />
                        </SwiperSlide>
                    ))}
                <Image
                    src={sliderArrows.leftArrow}
                    className='swiper-button-prev'
                    display={{ lg: 'block', base: 'none' }}
                    data-test-id={TEST_IDS.CAROUSEL_BACK}
                />
                <Image
                    src={sliderArrows.rightArrow}
                    display={{ lg: 'block', base: 'none' }}
                    className='swiper-button-next'
                    data-test-id={TEST_IDS.CAROUSEL_FORWARD}
                />
            </Swiper>
        </VStack>
    );
}
