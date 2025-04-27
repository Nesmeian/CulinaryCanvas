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

import { cleanAllergens, stopAllergens } from '~/store/allergens';
import { closeBurger } from '~/store/burgerSlice';
import { closeFilter } from '~/store/filterSlice';
import { setAllowSearch, setSearchState } from '~/store/searchSlice';

import * as navMenuIcons from '../../../assets/navMenuIcons/index';
import DB from '../../../data/db.json';
import GetCurrentPath from '../../../utils/getCurrentPath';

export default function NavMenuList() {
    const pathSegments = GetCurrentPath();
    const currentRoute = pathSegments[0];
    const currentSubRoute = pathSegments[1];
    const categoryIndex = DB.navMenu.categories.findIndex(
        (category) => category.routeName === currentRoute,
    );
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
    };
    return (
        <Accordion
            allowToggle
            className='navMenu__list'
            width='100%'
            index={activeCategoryIndex}
            onChange={(index) => setCategoryActiveIndex(index as number | undefined)}
        >
            {DB.navMenu.categories.map(({ elems, id, name, imgUrl, routeName }) => (
                <AccordionItem key={id} className='navMenu__item' border='0'>
                    <AccordionButton
                        as={RouterLink}
                        data-test-id={routeName === 'veganCuisine' ? 'vegan-cuisine' : undefined}
                        to={{
                            pathname: `/${routeName}/`,
                        }}
                        onClick={() => {
                            cleanEffects();
                        }}
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
                            <Image
                                src={navMenuIcons[imgUrl as keyof typeof navMenuIcons]}
                                alt={name}
                            />
                            <Text className='navMenu__item_text' variant='navMenuItems'>
                                {name}
                            </Text>
                        </HStack>
                        <AccordionIcon boxSize='24px' />
                    </AccordionButton>
                    {Object.entries(elems as Record<string, string>).map(
                        ([rusTitle, engTitle], index) => {
                            const expectedPath = engTitle || encodeURIComponent(rusTitle);
                            const isActive = expectedPath === currentSubRoute;

                            return (
                                <AccordionPanel
                                    key={`${id}-${index}`}
                                    p={isActive ? '0 0 10px 46px' : '0 0 10px 52px'}
                                    _hover={{ bg: 'gray.50' }}
                                >
                                    <HStack
                                        as={RouterLink}
                                        to={`/${routeName}/${expectedPath}`}
                                        cursor='pointer'
                                        onClick={() => {
                                            cleanEffects();
                                            dispatch(closeBurger());
                                        }}
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
                                            {rusTitle}
                                        </Text>
                                    </HStack>
                                </AccordionPanel>
                            );
                        },
                    )}
                </AccordionItem>
            ))}
        </Accordion>
    );
}
