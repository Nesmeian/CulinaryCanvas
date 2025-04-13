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

import DB from '~/data/db.json';

import * as navMenuIcons from '../../../assets/navMenuIcons/index';
export default function NavMenuList() {
    const [activeElement, setActiveElement] = useState<string | null>(null);
    const handleClick = (id: string, index: number) => {
        const elementKey = `${id}-${index}`;
        setActiveElement((prev) => (prev === elementKey ? null : elementKey));
    };
    return (
        <Accordion allowToggle className='navMenu__list' width='256px'>
            {DB.navMenu.map(({ elems, id, name, imgUrl }) => (
                <AccordionItem key={id} className='navMenu__item' border='0'>
                    <AccordionButton
                        display='flex'
                        justifyContent='space-between'
                        pb='16px'
                        pl='20px'
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
                    {elems.map((title, index) => {
                        const elementKey = `${id}-${index}`;
                        const isActive = activeElement === elementKey;

                        return (
                            <AccordionPanel
                                p='0 0 10px 52px'
                                key={elementKey}
                                onClick={() => handleClick(id, index)}
                                cursor='pointer'
                                transition='all 0.2s'
                                _hover={{ bg: 'gray.50' }}
                            >
                                <HStack spacing={2}>
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
