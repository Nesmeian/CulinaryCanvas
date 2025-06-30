import { HStack, Image, Text } from '@chakra-ui/react';

import { NotificationTypes } from '~/types/utilsTypes';

import * as socialIcons from '../../assets/socialIcons/index';

export default function AddNotifications({
    bookmarks,
    likes,
    subscribes,
    isRecipe,
}: NotificationTypes) {
    const gap = isRecipe ? '30px' : '17px';
    const textVariant = isRecipe ? 'addRecipeNotification' : 'addNotification';
    const boxSize = isRecipe ? '14px' : '12px';
    return (
        <HStack gap={gap} pr='3px'>
            {bookmarks && (
                <HStack gap='5px'>
                    <Image src={socialIcons.shares} boxSize={boxSize} />
                    <Text variant={textVariant}>{bookmarks}</Text>
                </HStack>
            )}
            {likes && (
                <HStack gap='5px'>
                    <Image src={socialIcons.likes} boxSize={boxSize} />
                    <Text variant={textVariant}>{likes}</Text>
                </HStack>
            )}
            {subscribes && (
                <HStack gap='5px'>
                    <Image src={socialIcons.views} boxSize={boxSize} />
                    <Text variant={textVariant}>{subscribes}</Text>
                </HStack>
            )}
        </HStack>
    );
}
