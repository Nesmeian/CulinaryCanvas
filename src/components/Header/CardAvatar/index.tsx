import { Avatar, HStack, Stack, Text } from '@chakra-ui/react';

import { UserProps } from '~/types/userTypes';

export default function CardAvatar({ userData }: UserProps) {
    const { img, name, lastName, email } = userData;
    return (
        <HStack gap='12px'>
            <Avatar name={`${name},${lastName}`} src={img} />
            <Stack className='avatar__text-container' gap='0'>
                <Text
                    className='avatar__full-name'
                    variant='avatarFullName'
                >{`${name} ${lastName}`}</Text>
                <Text variant='avatarEmail' className='avatar__email'>
                    {email}
                </Text>
            </Stack>
        </HStack>
    );
}
