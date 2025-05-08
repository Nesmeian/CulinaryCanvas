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
import { useGetFilteredCategories } from '~/Hooks/useGetFilteredCategories';
import { cleanAllergens, stopAllergens } from '~/store/allergens';
import { closeBurger } from '~/store/burgerSlice';
import { cleanFilterData, closeFilter } from '~/store/filterSlice';
import { setAllowSearch, setSearchState } from '~/store/searchSlice';

import DB from '../../../data/db.json';
import GetCurrentPath from '../../../utils/getCurrentPath';

export default function NavMenuList() {
    const dispatch = useDispatch();

    const [mainRoute, subRoute] = GetCurrentPath();

    const { data, isLoading } = useGetFilteredCategories();
    const categories = isLoading ? DB.navMenu.categories : data;

    const categoryIndex = categories.findIndex((c) => c.category === mainRoute);

    const [activeIndex, setActiveIndex] = useState<number | undefined>(
        categoryIndex !== -1 ? categoryIndex : undefined,
    );
    const cleanEffects = () => {
        dispatch(cleanAllergens());
        dispatch(stopAllergens());
        dispatch(setSearchState(''));
        dispatch(setAllowSearch(false));
        dispatch(closeFilter());
        dispatch(cleanFilterData());
        dispatch(closeBurger());
    };

    return (
        <Accordion
            index={activeIndex}
            onChange={(idx) => setActiveIndex(idx as number | undefined)}
        >
            {categories.map(({ _id, icon, title, category, subCategories }) => {
                const isParentActive = category === mainRoute;

                return (
                    <AccordionItem key={_id} border='0'>
                        <AccordionButton
                            as={RouterLink}
                            to={`/${category}/${subCategories[0].category}`}
                            data-test-id={category === 'vegan' ? 'vegan-cuisine' : category}
                            onClick={cleanEffects}
                            _expanded={{
                                bg: '#EAffc7',
                                fontWeight: 700,
                            }}
                        >
                            <HStack>
                                <Image src={`${IMG_PATH}${icon}`} alt={title} />
                                <Text fontWeight={isParentActive ? 700 : 400}>{title}</Text>
                            </HStack>
                            <AccordionIcon />
                        </AccordionButton>

                        {subCategories.map(({ _id: subId, title: subTitle, category: subCat }) => {
                            const isActive = subCat === subRoute;

                            return (
                                <AccordionPanel
                                    key={subId}
                                    data-test-id={
                                        isActive ? `${subCat}-active` : `${subCat}-${subId}`
                                    }
                                    p={isActive ? '0 0 10px 46px' : '0 0 10px 52px'}
                                    _hover={{ bg: 'gray.50' }}
                                >
                                    <HStack
                                        as={RouterLink}
                                        to={`/${category}/${subCat}`}
                                        cursor='pointer'
                                        onClick={cleanEffects}
                                    >
                                        <Box
                                            width={isActive ? '8px' : '1px'}
                                            height='24px'
                                            bg='#c4ff61'
                                        />
                                        <Text fontWeight={isActive ? 700 : 400}>{subTitle}</Text>
                                    </HStack>
                                </AccordionPanel>
                            );
                        })}
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}
