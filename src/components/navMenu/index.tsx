import './style.css';

import { VStack } from '@chakra-ui/react';

import useBreakpoints from '~/themes/chakraBreakPoints';

import BreadCrumb from '../breadCrumb';
import NavMenuFooter from './navMenuFooter';
import NavMenuList from './navMenuList';

export default function NavMenu() {
    const { isTablet } = useBreakpoints();
    return (
        <VStack
            as='nav'
            className='navMenu'
            alignItems='flex-start'
            justify='space-between'
            width='256px'
        >
            <VStack width='100%' overflowY='scroll'>
                {isTablet && <BreadCrumb />}
                <NavMenuList />
            </VStack>
            <NavMenuFooter />
        </VStack>
    );
}
