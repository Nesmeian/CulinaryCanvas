import { Avatar, HStack, Stack, Text } from '@chakra-ui/react';

export default function CardAvatar({ userData }) {
    const { img, name, lastName, email } = userData;
    return (
        <HStack gap='12px'>
            <Avatar name={`${name},${lastName}`} src={img} />
            <Stack className='avatar__text-container' gap='0'>
                <Text va>{`${name} ${lastName}`}</Text>
                <Text className='avatar__email'>{email}</Text>
            </Stack>
        </HStack>
    );
}
