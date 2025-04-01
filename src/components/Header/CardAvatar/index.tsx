import { Avatar, Box, Heading, HStack, Link } from '@chakra-ui/react';

export default function CardAvatar({ userData }) {
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
