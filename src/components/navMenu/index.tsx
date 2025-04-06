import './style.css';

import { VStack } from '@chakra-ui/react';

import NavMenuFooter from './navMenuFooter';
import NavMenuItems from './navMenuItems';
import { navMenuData } from './navMenuItems/navMenuData';

export default function navMenu() {
    return (
        <VStack
            className='navMenu'
            gap='22.5px'
            alignItems='flex-start'
            justify='space-between'
            height='100%'
        >
            <NavMenuItems navMenuData={navMenuData} />
            <NavMenuFooter />
        </VStack>
    );
}
