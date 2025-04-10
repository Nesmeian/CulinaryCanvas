import './style.css';

import { VStack } from '@chakra-ui/react';

import NavMenuFooter from './navMenuFooter';
import NavMenuItems from './navMenuItems';

export default function navMenu() {
    return (
        <VStack className='navMenu' alignItems='flex-start' justify='space-between' height='100%'>
            <NavMenuItems />
            <NavMenuFooter />
        </VStack>
    );
}
