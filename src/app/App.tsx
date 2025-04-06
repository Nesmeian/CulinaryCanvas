import { HStack, Stack } from '@chakra-ui/react';

import Aside from '~/components/Aside';
import Header from '~/components/Header';
import Main from '~/components/Main';
import SideBar from '~/components/Sidebar';

function App() {
    return (
        <Stack gap='0'>
            <Header />
            <HStack
                justifyContent='space-between'
                alignItems='flex-start'
                height='100vh'
                paddingTop='80px'
            >
                <SideBar />;
                <Main />
                <Aside />
            </HStack>
        </Stack>
    );
}

export default App;
