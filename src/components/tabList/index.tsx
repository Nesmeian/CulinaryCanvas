import { Tab, TabList, Tabs } from '@chakra-ui/react';
import { useState } from 'react';

import DB from '../../data/db.json';

export default function AddTabList({ location }: { location: string }) {
    const navList = DB.navMenu.subcategories;
    const startIndex = Object.values(navList).indexOf(location);
    const [tabIndex, setTabIndex] = useState(startIndex);

    return (
        <Tabs
            index={tabIndex}
            onChange={(index) => setTabIndex(index)}
            variant='unstyled'
            colorScheme='green'
            width='1006px'
            mb='24px'
        >
            <TabList
                overflowX='auto'
                overflowY='hidden'
                justifyContent='center'
                position='relative'
                width='100%'
                sx={{
                    '&::-webkit-scrollbar': {
                        height: '0',
                        width: '0',
                        background: 'transparent',
                    },
                }}
            >
                {Object.entries(navList).map(([key, _]) => (
                    <Tab
                        key={key}
                        color='#134B00'
                        whiteSpace='nowrap'
                        borderBottom='3px solid'
                        borderColor='transparent'
                        transition='all 0.2s'
                        fontSize={{ base: '14px', md: '16px' }} // Адаптивный шрифт
                        px={{ base: 3, md: 4 }} // Адаптивные отступы
                        flexShrink={0} // Запрещаем сжатие элементов
                        _selected={{
                            color: '#2DB100',
                            borderColor: '#2DB100',
                            fontWeight: 500,
                        }}
                        _hover={{
                            color: 'green.500',
                        }}
                    >
                        {key}
                    </Tab>
                ))}
            </TabList>
        </Tabs>
    );
}
