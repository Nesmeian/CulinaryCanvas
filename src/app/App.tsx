import './style.css';

import { HStack, Stack } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router';

import Header from '../components/Header';
import NavMenu from '../components/navMenu';
import Sidebar from '../components/Sidebar';
import AppRoutes from '../routes';
import useBreakpoints from '../themes/chakraBreakPoints';

function App() {
    const { isTablet } = useBreakpoints();
    return (
        <BrowserRouter>
            <Stack gap='0px'>
                <Header />
                <HStack className='app' alignItems='flex-start' gap='12px' justify='space-between'>
                    {!isTablet && <NavMenu />}
                    <AppRoutes />
                    {!isTablet && <Sidebar />}
                </HStack>
            </Stack>
        </BrowserRouter>
    );
}

export default App;
