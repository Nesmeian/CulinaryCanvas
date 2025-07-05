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
import { Link as RouterLink } from 'react-router-dom';

import { TEST_IDS } from '~/constants/testsIds';
import { useGetFilteredCategories } from '~/Hooks/useGetFilteredCategories';
import { IMG_PATH } from '~/shared/config/api';

import DB from '../../../data/db.json';
import GetCurrentPath from '../../../utils/getCurrentPath';

export default function NavMenuList() {
    const [mainRoute, subRoute] = GetCurrentPath();
    const { data, isLoading } = useGetFilteredCategories();
    const categories = isLoading ? DB.navMenu.categories : data;

    const categoryIndex = categories.findIndex((c) => c.category === mainRoute);

    const [activeIndex, setActiveIndex] = useState<number | undefined>(
        categoryIndex !== -1 ? categoryIndex : undefined,
    );

    return (
        <Accordion
            index={activeIndex}
            onChange={(idx) => setActiveIndex(idx as number | undefined)}
            width='100%'
            pt={{ lg: '40px', base: '0' }}
        >
            {categories.map(({ _id, icon, title, category, subCategories }) => {
                const isParentActive = category === mainRoute;

                return (
                    <AccordionItem key={_id} border='0'>
                        <AccordionButton
                            display='flex'
                            justifyContent='space-between'
                            as={RouterLink}
                            to={`/${category}/${subCategories[0].category}`}
                            data-test-id={category === 'vegan' ? TEST_IDS.VEGAN : category}
                            _expanded={{
                                bg: '#EAffc7',
                                fontWeight: 700,
                            }}
                            pl='0'
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
