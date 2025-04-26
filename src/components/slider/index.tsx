import './style.css';

import { Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import filterRecipesOnData from '~/utils/filterOnData';

import * as sliderImgs from '../../assets/recipeImages/index';
import * as sliderArrows from '../../assets/sliderArrows/index';
import useBreakpoints from '../../themes/chakraBreakPoints';
import { TagKey } from '../../types/utilsTypes';
import AddNotifications from '../../utils/addNotifications';
import Tags from '../../utils/addTags';

export default function Slider({ isRecipePage }: { isRecipePage?: boolean }) {
    const { isTablet } = useBreakpoints();
    const sortedOnTimeRecipes = filterRecipesOnData();
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
                className='slider__list'
                spaceBetween={24}
                modules={[Navigation]}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                loop={true}
                breakpoints={{
                    1920: { slidesPerView: 4 },
                    1440: { slidesPerView: 3 },
                    768: { slidesPerView: 4.2 },
                    360: { slidesPerView: 2 },
                }}
            >
                {sortedOnTimeRecipes.map(
                    ({ id, imgUrl, title, description, category, bookmarks, likes }) => (
                        <SwiperSlide key={id} className='slider__item'>
                            <Image
                                height={{ lg: '230px', sm: '128px' }}
                                src={sliderImgs[imgUrl as keyof typeof sliderImgs]}
                                alt={title}
                            />
                            <VStack className='slider__item-content' align='flex-start' gap='6spx'>
                                <VStack
                                    className='slider__text-group'
                                    alignItems='flex-start'
                                    gap='0px'
                                    width='100%'
                                >
                                    <Heading
                                        as='h4'
                                        size='h4'
                                        noOfLines={{ lg: 1, sm: 2 }}
                                        sx={{
                                            wordBreak: 'break-all',
                                            overflowWrap: 'anywhere',
                                        }}
                                        className='slider__item-title'
                                    >
                                        {title}
                                    </Heading>
                                    {!isTablet && (
                                        <Text
                                            className='slider__content-description'
                                            variant='sectionDescription'
                                        >
                                            {description}
                                        </Text>
                                    )}
                                </VStack>
                                <HStack
                                    className='slider__controls'
                                    justify={{ lg: 'space-between', base: 'flex-start' }}
                                    alignItems='flex-start'
                                >
                                    <Tags
                                        tag={category as TagKey[]}
                                        withText={true}
                                        color='#d7ff94'
                                        size='16px'
                                    />
                                    <AddNotifications bookmarks={bookmarks} likes={likes} />
                                </HStack>
                            </VStack>
                        </SwiperSlide>
                    ),
                )}
                <Image src={sliderArrows.leftArrow} className='swiper-button-prev' />
                <Image src={sliderArrows.rightArrow} className='swiper-button-next' />
            </Swiper>
        </VStack>
    );
}
