import { HStack, Image, Text } from '@chakra-ui/react';

import * as socialIcons from '../../assets/socialIcons/index';
import { addNotificationsProps } from '../../types/utilsTypes';

export default function AddNotifications({ notifications, isRecipe }: addNotificationsProps) {
    const gap = isRecipe ? '30px' : '17px';
    const textVariant = isRecipe ? 'addRecipeNotification' : 'addNotification';
    const boxSize = isRecipe ? '14px' : '12px';
    return (
        <HStack gap={gap} pr='3px'>
            {notifications?.share && (
                <HStack gap='5px'>
                    <Image src={socialIcons.shares} boxSize={boxSize} />
                    <Text variant={textVariant}>{notifications.share}</Text>
                </HStack>
            )}
            {notifications?.likes && (
                <HStack gap='5px'>
                    <Image src={socialIcons.likes} boxSize={boxSize} />
                    <Text variant={textVariant}>{notifications.likes}</Text>
                </HStack>
            )}
        </HStack>
    );
}
