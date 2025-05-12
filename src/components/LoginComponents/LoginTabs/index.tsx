import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { tabStyles } from '~/components/Pages/Login/textStyles';

import { LoginTab } from './loginTab';
import { RegTab } from './regTab';

export const LoginTabs = () => (
    <Tabs width={{ lg: '461px', md: '355px', base: '328px' }} ml='22px'>
        <TabList gap='12px' mb='40px'>
            <Tab {...tabStyles}>Вход на сайт</Tab>
            <Tab {...tabStyles}>Регистрация</Tab>
        </TabList>
        <TabPanels>
            <TabPanel p={0}>
                <LoginTab />
            </TabPanel>
            <TabPanel p={0}>
                <RegTab />
            </TabPanel>
        </TabPanels>
    </Tabs>
);
