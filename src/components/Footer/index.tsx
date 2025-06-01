import './style.css';

import { Box, Button, HStack, Image, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { TEST_IDS } from '~/constants/testsIds';

import * as btnImg from '../../assets/footerBtns/index';
import { ApplicationState } from '../../store/configure-store';
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
        <Box as='footer' data-test-id={TEST_IDS.FOOTER} className='footer' zIndex={100}>
            <HStack width='100%' height='100%' justify='space-between'>
                <Button
                    sx={buttonStyles}
                    variant='plain'
                    bgGradient='radial-gradient(62.52% 62.51% at 48.89% 37.5%, #c4ff61 0%, rgba(255, 255, 255, 0) 60%)'
                >
                    <Image src={btnImg.homeBtn} boxSize='48px' />
                    <Text fontSize='10px'>Главная</Text>
                </Button>

                <Button sx={buttonStyles} variant='plain'>
                    <Image src={btnImg.searchBtn} boxSize='48px' />
                    <Text fontSize='10px'>Поиск</Text>
                </Button>

                <Button as={Link} to='/new-recipe' sx={buttonStyles} variant='plain'>
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
