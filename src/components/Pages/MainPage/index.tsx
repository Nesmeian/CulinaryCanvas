import { HStack, Stack } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import Footer from '~/components/Footer';
import Header from '~/components/Header';
import NavMenu from '~/components/navMenu';
import Sidebar from '~/components/Sidebar';
import useBreakpoints from '~/themes/chakraBreakPoints';
import GetCurrentPath from '~/utils/getCurrentPath';

export const MainPage = () => {
    const { isTablet } = useBreakpoints();
    const currentPath = GetCurrentPath();
    const newRecipePath = currentPath[0] === 'new-recipe';
    return (
        <Stack gap='0px'>
            <Header />
            <HStack className='app' alignItems='flex-start' gap='12px' justify='space-between'>
                {!isTablet && <NavMenu />}
                <Outlet />
                {!isTablet && !newRecipePath && <Sidebar />}
            </HStack>
            <Footer />
        </Stack>
    );
};
