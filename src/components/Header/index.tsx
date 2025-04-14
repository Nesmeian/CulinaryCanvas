import './style.css';

import { Box, HStack, Image } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { ApplicationState } from '~/store/configure-store';
import useBreakpoints from '~/themes/chakraBreakPoints';

import * as logoUrl from '../../assets/logo/index';
import CardAvatar from '../CardAvatar';
import NotificationList from '../Notification';
import BreadCrumb from './breadCrumb';
import Burger from './burger';

export default function Header() {
    const userData = useSelector((state: ApplicationState) => state.userData);
    const { isTablet, isMobile } = useBreakpoints();
    const logo = isMobile ? logoUrl.mobileLogo : logoUrl.logo;

    return (
        <HStack className='header' as='header'>
            <Box className='header__img'>
                <Image src={logo} alt='logo image' />
            </Box>
            {!isTablet ? (
                <HStack className='header__container' justify='space-between'>
                    <BreadCrumb />
                    <CardAvatar userData={userData} />
                </HStack>
            ) : (
                <HStack
                    className='header__container'
                    justify='flex-end'
                    gap={{ sm: '15', md: '22px' }}
                >
                    <NotificationList direction='horizontal' />
                    <Burger />
                </HStack>
            )}
        </HStack>
    );
}
