import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { LoginTab } from './loginTab';
import { RegTab } from './regTab';

export const LoginTabs = () => {
    console.log('tabs');
    return (
        <Tabs>
            <TabList>
                <Tab>Вход на сайт</Tab>
                <Tab>Регистрация</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <LoginTab />
                </TabPanel>
                <TabPanel>
                    <RegTab />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
