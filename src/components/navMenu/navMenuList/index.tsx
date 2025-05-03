import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    HStack,
    Image,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router';

import { IMG_PATH } from '~/constants';
import { useFilteredCategories } from '~/Hooks/useGetFilteredCategories';
import { cleanAllergens, stopAllergens } from '~/store/allergens';
import { cleanFilterData, closeFilter } from '~/store/filterSlice';
import { setAllowSearch, setSearchState } from '~/store/searchSlice';

import DB from '../../../data/db.json';
import GetCurrentPath from '../../../utils/getCurrentPath';

export default function NavMenuList() {
    const pathSegments = GetCurrentPath();
    const currentRoute = pathSegments[0];
    const currentSubRoute = pathSegments[1];
    const { data, loading } = useFilteredCategories();

    const initialCategories = DB.navMenu.categories;
    const categoryData = loading ? initialCategories : data;

    const categoryIndex = categoryData.findIndex((category) => category.category === currentRoute);
    const [activeCategoryIndex, setCategoryActiveIndex] = useState<number | undefined>(
        categoryIndex !== -1 ? categoryIndex : undefined,
    );
    const dispatch = useDispatch();
    const cleanEffects = () => {
        dispatch(cleanAllergens());
        dispatch(stopAllergens());
        dispatch(setSearchState(''));
        dispatch(setAllowSearch(false));
        dispatch(closeFilter());
        dispatch(cleanFilterData());
    };

    return (
        <Accordion
            allowToggle
            className='navMenu__list'
            width='100%'
            index={activeCategoryIndex}
            onChange={(index) => setCategoryActiveIndex(index as number | undefined)}
        >
            {categoryData.map(({ subCategories, _id, title, icon, category }) => (
                <AccordionItem key={_id} className='navMenu__item' border='0'>
                    <AccordionButton
                        as={RouterLink}
                        data-test-id={category === 'vegan' ? 'vegan-cuisine' : category}
                        to={{
                            pathname: `/${category}/${subCategories[0].category}`,
                        }}
                        onClick={cleanEffects}
                        transition='font-weight 0.2s'
                        display='flex'
                        justifyContent='space-between'
                        pb='16px'
                        pl='0'
                        _expanded={{
                            bg: '#EAffc7',
                            '& .navMenu__item_text': {
                                color: 'black.700',
                                fontWeight: 700,
                            },
                            '& .accordion-icon': {
                                transform: 'rotate(180deg)',
                                color: 'black.700',
                            },
                        }}
                    >
                        <HStack gap='12px' className='navMenu__item-inner'>
                            <Image src={`${IMG_PATH}${icon}`} alt={title} />
                            <Text className='navMenu__item_text' variant='navMenuItems'>
                                {title}
                            </Text>
                        </HStack>
                        <AccordionIcon boxSize='24px' />
                    </AccordionButton>
                    {subCategories.map(({ title, category: cat, _id }, index) => {
                        const expectedPath = cat;
                        const isActive = expectedPath === currentSubRoute;

                        return (
                            <AccordionPanel
                                data-test-id={
                                    isActive ? `${expectedPath}-active` : `${expectedPath}-${index}`
                                }
                                key={`${_id}-${index}`}
                                p={isActive ? '0 0 10px 46px' : '0 0 10px 52px'}
                                _hover={{ bg: 'gray.50' }}
                            >
                                <HStack
                                    as={RouterLink}
                                    to={`/${category}/${expectedPath}`}
                                    cursor='pointer'
                                    onClick={cleanEffects}
                                >
                                    <Box
                                        width={isActive ? '8px' : '1px'}
                                        height='24px'
                                        background='#c4ff61'
                                        transition='width 0.2s ease'
                                    />
                                    <Text
                                        fontWeight={isActive ? 700 : 400}
                                        transition='font-weight 0.2s'
                                    >
                                        {title}
                                    </Text>
                                </HStack>
                            </AccordionPanel>
                        );
                    })}
                </AccordionItem>
            ))}
        </Accordion>
    );
}
