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
import { Link as RouterLink } from 'react-router';

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
    const initialActiveSubElement = (() => {
        const category = DB.navMenu.categories.find((c) => c.routeName === currentRoute);
        if (category && currentSubRoute) {
            const elemsArray = Object.entries(category.elems as Record<string, string>);
            for (let index = 0; index < elemsArray.length; index++) {
                const [rusTitle, engTitle] = elemsArray[index];
                const expectedPath = engTitle || encodeURIComponent(rusTitle);
                if (expectedPath === currentSubRoute) {
                    return `${category.id}-${index}`;
                }
            }
        }
        return null;
    })();
    const [activeSubElement, setActiveSubElement] = useState<string | null>(
        initialActiveSubElement,
    );
    const handleClickSubElement = (id: string, index: number) => {
        const elementKey = `${id}-${index}`;
        setActiveSubElement((prev) => (prev === elementKey ? null : elementKey));
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
                            const elementKey = `${id}-${index}`;
                            const isActive = activeSubElement === elementKey;

                            return (
                                <AccordionPanel
                                    p={isActive ? '0 0 10px 46px' : '0 0 10px 52px'}
                                    key={elementKey}
                                    onClick={() => handleClickSubElement(id, index)}
                                    cursor='pointer'
                                    transition='all 0.2s'
                                    _hover={{ bg: 'gray.50' }}
                                >
                                    <HStack
                                        spacing={2}
                                        as={RouterLink}
                                        to={{
                                            pathname: `/${routeName}/${engTitle}`,
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
