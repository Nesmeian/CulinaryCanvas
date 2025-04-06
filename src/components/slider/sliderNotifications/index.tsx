import { HStack, Image, Text } from '@chakra-ui/react';

import { SliderNotificationsProps } from '~/types/sliderTypes';

import likeImg from '../../../assets/socialIcons/likes.svg';
import shareImg from '../../../assets/socialIcons/shares.svg';

export default function SliderNotifications({ notifications }: SliderNotificationsProps) {
    return (
        <HStack pr='28px' gap='17px'>
            {notifications?.share && (
                <HStack gap='5px'>
                    <Image src={shareImg} boxSize='12px' />
                    <Text variant='sliderNotification'>{notifications.share}</Text>
                </HStack>
            )}
            {notifications?.likes && (
                <HStack gap='5px'>
                    <Image src={likeImg} boxSize='12px' />
                    <Text variant='sliderNotification'>{notifications.likes}</Text>
                </HStack>
            )}
        </HStack>
    );
}
