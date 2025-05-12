import { HStack, Stack } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import Footer from '~/components/Footer';
import Header from '~/components/Header';
import NavMenu from '~/components/navMenu';
import Sidebar from '~/components/Sidebar';
import useBreakpoints from '~/themes/chakraBreakPoints';

export const MainPage = () => {
    const { isTablet } = useBreakpoints();
    return (
        <Stack gap='0px'>
            <Header />
            <HStack className='app' alignItems='flex-start' gap='12px' justify='space-between'>
                {!isTablet && <NavMenu />}
                <Outlet />
                {!isTablet && <Sidebar />}
            </HStack>
            <Footer />
        </Stack>
    );
};
