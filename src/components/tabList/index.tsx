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
    const navList = DB.navMenu.categories.find(
        ({ category: cat }) => cat === category,
    )?.subCategories;
    const paths = navList?.map(({ category }) => category);
    const segments = GetCurrentPath();
    const base = segments[0] || '';
    const currentSub = segments[1] || '';
    const startIndex = currentSub && paths?.includes(currentSub) ? paths.indexOf(currentSub) : -1;
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
        const newIndex = currentSub && paths?.includes(currentSub) ? paths.indexOf(currentSub) : -1;
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
                {navList?.map(({ title, category }, index) => {
                    let toPath: string;
                    if (currentSub) {
                        const newSegs = [base, category];
                        toPath = '/' + newSegs.join('/');
                    } else if (base) {
                        toPath = `/${base}/${category}`;
                    } else {
                        toPath = `/${category}`;
                    }

                    return (
                        <Tab
                            data-test-id={`tab-${category}-${index}`}
                            key={title}
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
                            {title}
                        </Tab>
                    );
                })}
            </TabList>
        </Tabs>
    );
}
