import { HStack, Image, Text } from '@chakra-ui/react';

import { addNotificationsProps } from '~/types/utilsTypes';

import * as socialIcons from '../../assets/socialIcons/index';

export default function AddNotifications({ notifications }: addNotificationsProps) {
    return (
        <HStack pr='28px' gap='17px'>
            {notifications?.share && (
                <HStack gap='5px'>
                    <Image src={socialIcons.shares} boxSize='12px' />
                    <Text variant='addNotification'>{notifications.share}</Text>
                </HStack>
            )}
            {notifications?.likes && (
                <HStack gap='5px'>
                    <Image src={socialIcons.likes} boxSize='12px' />
                    <Text variant='addNotification'>{notifications.likes}</Text>
                </HStack>
            )}
        </HStack>
    );
}
