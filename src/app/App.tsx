import { Stack } from '@chakra-ui/react';

import Header from '~/components/Header';
import Main from '~/components/Main';

function App() {
    return (
        <Stack gap='0'>
            <Header />
            <Main />
        </Stack>
    );
}

export default App;
