import { Avatar, Heading, HStack, Stack } from '@chakra-ui/react';

import { UserProps } from '~/types/userTypes';

export default function CardAvatar({ userData }: UserProps) {
    const { img, name, lastName, email } = userData;
    return (
        <HStack gap='12px'>
            <Avatar name={`${name},${lastName}`} src={img} />
            <Stack className='avatar__text-container' gap='0'>
                <Heading className='avatar__full-name'>{`${name} ${lastName}`}</Heading>
                <Heading as='p' className='avatar__email'>
                    {email}
                </Heading>
            </Stack>
        </HStack>
    );
}
