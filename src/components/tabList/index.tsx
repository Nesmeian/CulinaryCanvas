import { Tab, TabList, Tabs } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router';

import { cleanAllergens, stopAllergens } from '~/store/allergens';
import { closeBurger } from '~/store/burgerSlice';
import { cleanFilterData, closeFilter } from '~/store/filterSlice';
import { setAllowSearch, setSearchState } from '~/store/searchSlice';
import GetCurrentPath from '~/utils/getCurrentPath';

import DB from '../../data/db.json';

export default function AddTabList({ category }: { category: string }) {
    const navList = DB.navMenu.categories.find(({ routeName }) => routeName === category)?.elems;
    const paths = Object.values(navList);
    const segments = GetCurrentPath();
    const base = segments[0] || '';
    const currentSub = segments[1] || '';
    const startIndex = currentSub && paths.includes(currentSub) ? paths.indexOf(currentSub) : -1;
    const dispatch = useDispatch();
    const [tabIndex, setTabIndex] = useState(startIndex);
    const cleanEffects = () => {
        dispatch(closeBurger());
        dispatch(cleanAllergens());
        dispatch(stopAllergens());
        dispatch(setSearchState(''));
        dispatch(setAllowSearch(false));
        dispatch(closeFilter());
        dispatch(cleanFilterData());
    };
    useEffect(() => {
        const newIndex = currentSub && paths.includes(currentSub) ? paths.indexOf(currentSub) : -1;
        setTabIndex(newIndex);
    }, [currentSub, paths]);
    return (
        <Tabs
            index={tabIndex}
            onChange={(index) => setTabIndex(index)}
            width={{ md: '70%', sm: '100%' }}
            variant='unstyled'
            colorScheme='green'
            mb='24px'
        >
            <TabList
                overflowX='auto'
                overflowY='hidden'
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
                {Object.entries(navList).map(([name, path]) => {
                    let toPath: string;

                    if (currentSub) {
                        const newSegs = [base, path];
                        toPath = '/' + newSegs.join('/');
                    } else if (base) {
                        toPath = `/${base}/${path}`;
                    } else {
                        toPath = `/${path}`;
                    }

                    return (
                        <Tab
                            key={name}
                            as={Link}
                            to={toPath}
                            color='#134B00'
                            whiteSpace='nowrap'
                            borderBottom='3px solid'
                            borderColor='transparent'
                            transition='all 0.2s'
                            onClick={() => cleanEffects()}
                            fontSize={{ base: '14px', md: '16px' }}
                            px={{ base: 3, md: 4 }}
                            flexShrink={0}
                            _selected={{
                                color: '#2DB100',
                                borderColor: '#2DB100',
                                fontWeight: 500,
                            }}
                            _hover={{
                                color: 'green.500',
                            }}
                        >
                            {name}
                        </Tab>
                    );
                })}
            </TabList>
        </Tabs>
    );
}
