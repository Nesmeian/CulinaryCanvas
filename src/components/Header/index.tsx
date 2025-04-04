import './style.css';

import { Box, HStack, Image, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { ApplicationState } from '~/store/configure-store';

import logoUrl from '../../assets/logo.svg';
import CardAvatar from './CardAvatar';

export default function Header() {
    const temporaryRout = 'Главная';
    const userData = useSelector((state: ApplicationState) => state.userData);

    return (
        <HStack className='header'>
            <Box className='header__img'>
                <Image src={logoUrl} />
            </Box>
            <HStack className='header__container' justify='space-between'>
                <Text className='currentRoute' variant='currentRoute'>
                    {temporaryRout}
                </Text>
                <CardAvatar userData={userData} />
            </HStack>
        </HStack>
    );
}
