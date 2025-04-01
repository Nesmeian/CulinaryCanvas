import { Avatar, Box, Heading, HStack, Link } from '@chakra-ui/react';

import { UserProps } from '~/types';

export default function CardAvatar({ userData }: UserProps) {
    const { img, name, lastName, email } = userData;
    return (
        <HStack>
            <Avatar name={`${name},${lastName}`} src={img} />
            <Box>
                <Heading>{`${name} ${lastName}`}</Heading>
                <Link>{email}</Link>
            </Box>
        </HStack>
    );
}
