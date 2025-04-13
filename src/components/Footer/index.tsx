import './style.css';

import { Box, Button, HStack, Image, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { ApplicationState } from '~/store/configure-store';

import * as btnImg from '../../assets/footerBtns/index';
import CardAvatar from '../CardAvatar';
export default function Footer() {
    const buttonStyles = {
        flex: 1,
        height: '100%',
        fontSize: '14px',
        fontWeight: '400',
        p: '8px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        variant: 'plain',
        _active: { bg: 'transparent' },
        _hover: { bg: 'transparent' },
    };

    const userData = useSelector((state: ApplicationState) => state.userData);

    return (
        <Box as='footer' className='footer'>
            <HStack width='100%' height='100%' justify='space-between'>
                <Button sx={buttonStyles} variant='plain'>
                    <Image src={btnImg.homeBtn} boxSize='48px' />
                    <Text fontSize='10px'>Главная</Text>
                </Button>

                <Button sx={buttonStyles} variant='plain'>
                    <Image src={btnImg.searchBtn} boxSize='48px' />
                    <Text fontSize='10px'>Поиск</Text>
                </Button>

                <Button sx={buttonStyles} variant='plain'>
                    <Image src={btnImg.writeBtn} boxSize='48px' />
                    <Text fontSize='10px'>Записать</Text>
                </Button>

                <Button sx={buttonStyles} variant='plain'>
                    <CardAvatar userData={userData} isLogo />
                </Button>
            </HStack>
        </Box>
    );
}
