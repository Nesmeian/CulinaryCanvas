import { Avatar, HStack, Stack, Text } from '@chakra-ui/react';

import { UserProps } from '~/types/userTypes';

import * as usersImg from '../../assets/users/commonImg';

export default function CardAvatar({ userData }: UserProps) {
    const { img, user, email } = userData;
    return (
        <HStack gap='12px'>
            <Avatar name={user} src={usersImg[img as keyof typeof usersImg]} />
            <Stack gap='0'>
                <Text variant='avatarFullName'>{user}</Text>
                <Text variant='avatarEmail'>{email}</Text>
            </Stack>
        </HStack>
    );
}
