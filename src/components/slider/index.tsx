import './style.css';

import { Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';

import { TagKey } from '~/types/utilsTypes';

import * as sliderArrows from '../../assets/sliderArrows/index';
import AddNotifications from '../../utils/addNotifications';
import Tags from '../../utils/addTags';
import sliderData from './sliderdata';
export default function Slider() {
    return (
        <VStack width='100%' align='flex-start'>
            <Heading as='h2' size='h2' p='35px 0 0 10px'>
                Новые рецепты
            </Heading>
            <HStack className='slider' gap='23px' pr='10px'>
                <Image src={sliderArrows.leftArrow} className='slider__left-arrow' />
                {sliderData.map(({ imgUrl, title, description, tag, notifications }) => (
                    <VStack key={title} width='322px' className='slider__item' overflow='hidden'>
                        <Image src={imgUrl} alt={title} />
                        <VStack align='flex-start' p='7px 0 0 22px' gap='6px'>
                            <Heading as='h4' size='h4' noOfLines={1}>
                                {title}
                            </Heading>
                            <Text variant='sectionDescription'>{description}</Text>
                            <HStack m='25px 0 20px 0' justify='space-between' width='100%'>
                                <Tags tag={tag as TagKey} />
                                <AddNotifications notifications={notifications} />
                            </HStack>
                        </VStack>
                    </VStack>
                ))}
                <Image src={sliderArrows.rightArrow} className='slider__right-arrow' />
            </HStack>
        </VStack>
    );
}
