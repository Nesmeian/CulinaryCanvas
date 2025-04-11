import './style.css';

import { Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';

import DB from '~/data/db.json';
import useBreakpoints from '~/themes/chakraBreakPoints';
import { TagKey } from '~/types/utilsTypes';

import * as sliderArrows from '../../assets/sliderArrows/index';
import * as sliderImgs from '../../assets/sliderImg/index';
import AddNotifications from '../../utils/addNotifications';
import Tags from '../../utils/addTags';

export default function Slider() {
    const { isTablet } = useBreakpoints();
    return (
        <VStack align='flex-start' className='slider'>
            <Heading as='h2' size='h2' className='slider__title'>
                Новые рецепты
            </Heading>
            <HStack
                gap={{ xl: '26px', lg: '12px', sm: '12px' }}
                className='slider__list'
                width='100%'
                overflow='hidden'
            >
                {!isTablet && <Image src={sliderArrows.leftArrow} className='slider__left-arrow' />}
                {DB.sliderData.map(({ id, imgUrl, title, description, tag, notifications }) => (
                    <VStack key={id} className='slider__item' overflow='hidden'>
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
                            <HStack className='slider__controls' justify='space-between'>
                                <Tags
                                    tag={tag as TagKey}
                                    withText={true}
                                    color='#d7ff94'
                                    size='16px'
                                />
                                <AddNotifications notifications={notifications} />
                            </HStack>
                        </VStack>
                    </VStack>
                ))}
                {!isTablet && (
                    <Image src={sliderArrows.rightArrow} className='slider__right-arrow' />
                )}
            </HStack>
        </VStack>
    );
}
