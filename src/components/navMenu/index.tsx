import './style.css';

import { VStack } from '@chakra-ui/react';

import NavMenuFooter from './navMenuFooter';
import NavMenuList from './navMenuList';

export default function navMenu() {
    return (
        <VStack
            as='nav'
            className='navMenu'
            alignItems='flex-start'
            justify='space-between'
            height='100%'
        >
            <NavMenuList />
            <NavMenuFooter />
        </VStack>
    );
}
