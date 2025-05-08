import './style.css';

import { Box, HStack, Image, useDisclosure } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';

import { TEST_IDS } from '~/constants/testsIds';

import * as logoUrl from '../../assets/logo/index';
import { ApplicationState } from '../../store/configure-store';
import useBreakpoints from '../../themes/chakraBreakPoints';
import BreadCrumb from '../breadCrumb';
import CardAvatar from '../CardAvatar';
import Drawer from '../drawer';
import NavMenu from '../navMenu';
import NotificationList from '../Notification';
import Burger from './burger';

export default function Header() {
    const userData = useSelector((state: ApplicationState) => state.userData);
    const { isMobile } = useBreakpoints();
    const logo = isMobile ? logoUrl.mobileLogo : logoUrl.logo;
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <HStack
            className='header'
            as='header'
            data-test-id={TEST_IDS.HEADER}
            background={isOpen ? '#ffffff' : '#ffffd3'}
            zIndex={isOpen ? 2000 : 40}
        >
            <Box className='header__img'>
                <Image src={logo} alt='logo image' />
            </Box>

            <Box className='header__container-desktop header__container'>
                <BreadCrumb isOpen />
                <CardAvatar userData={userData} />
            </Box>

            <Box
                className='header__container-tablet header__container'
                gap={{ sm: '15', md: '22px' }}
            >
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            key='notifications'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <NotificationList direction='horizontal' />
                        </motion.div>
                    )}
                </AnimatePresence>
                <Burger onClick={onOpen} isOpen={isOpen} onClose={onClose} />
            </Box>

            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                element={<NavMenu isDrawer onClose={onClose} />}
            />
        </HStack>
    );
}
