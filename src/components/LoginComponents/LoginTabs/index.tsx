import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { tabStyles } from '~/components/Pages/Login/textStyles';
import GetCurrentPath from '~/utils/getCurrentPath';

import { LoginTab } from './loginTab';
import { RegTab } from './regTab';

export const LoginTabs = () => {
    const navigate = useNavigate();
    const currentPath = GetCurrentPath();
    const getTabIndex = () => {
        if (currentPath.includes('login')) return 0;
        return 1;
    };
    const [tabIndex, setTabIndex] = useState(getTabIndex);
    const handleTabsChange = (index: number) => {
        setTabIndex(index);
        navigate(index === 0 ? '/login' : '/registration');
    };
    return (
        <Tabs
            isLazy
            index={tabIndex}
            onChange={handleTabsChange}
            isFitted
            width={{ lg: '461px', md: '355px', base: '328px' }}
            ml='22px'
        >
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
};
