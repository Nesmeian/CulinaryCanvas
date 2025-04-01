import { Box, Heading, HStack, Image } from '@chakra-ui/react';

import logoUrl from '../../assets/logo.svg';
import userImg from '../../assets/userImg.png';
import CardAvatar from './CardAvatar';

export default function Header() {
    const temporaryRout = 'Главная';
    const userData = {
        img: userImg,
        name: 'Екатерина',
        lastName: 'Константинопольская',
        email: 'bake_and_pie',
    };
    return (
        <HStack justify='space-between' width='100%'>
            <Box>
                <Image src={logoUrl} />
            </Box>
            <Heading>{temporaryRout}</Heading>
            <CardAvatar userData={userData} />
        </HStack>
    );
}
