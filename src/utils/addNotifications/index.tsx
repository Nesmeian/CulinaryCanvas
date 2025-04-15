import { HStack, Image, Text } from '@chakra-ui/react';

import * as socialIcons from '../../assets/socialIcons/index';
import { addNotificationsProps } from '../../types/utilsTypes';

export default function AddNotifications({ notifications }: addNotificationsProps) {
    return (
        <HStack gap='17px' pr='3px'>
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
