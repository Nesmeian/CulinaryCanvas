import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { tabStyles } from '~/components/Pages/Login/styles';
import GetCurrentPath from '~/utils/getCurrentPath';

import { LoginTab } from './loginTab';
import { RegTab } from './regTab';

export const LoginTabs = () => {
    const navigate = useNavigate();
    const currentPath = GetCurrentPath();

    const getTabIndex = (segments: string[]) => (segments.includes('login') ? 0 : 1);
    const [tabIndex, setTabIndex] = useState(() => getTabIndex(currentPath));
    useEffect(() => {
        const newIndex = getTabIndex(currentPath);
        if (newIndex !== tabIndex) {
            setTabIndex(newIndex);
        }
    }, [currentPath.join('/')]);

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
