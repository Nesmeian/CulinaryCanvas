import { Avatar, HStack, Stack, Text } from '@chakra-ui/react';

import { UserProps } from '~/types/userTypes';

import * as usersImg from '../../assets/users/commonImg';

export default function CardAvatar({ userData }: UserProps) {
    const { img, user, email } = userData;
    return (
        <HStack gap={{ lg: '12px', sm: '8px' }}>
            <Avatar
                name={user}
                src={usersImg[img as keyof typeof usersImg]}
                boxSize={{ lg: '48px', sm: '32px' }}
            />
            <Stack gap='0'>
                <Text noOfLines={1} variant='avatarFullName'>
                    {user}
                </Text>
                <Text variant='avatarEmail' fontSize={{ lg: '14px', sm: '12px' }}>
                    {email}
                </Text>
            </Stack>
        </HStack>
    );
}
