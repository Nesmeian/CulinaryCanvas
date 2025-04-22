import './style.css';

import { VStack } from '@chakra-ui/react';

import useBreakpoints from '~/themes/chakraBreakPoints';

import BreadCrumb from '../breadCrumb';
import { StyledNav } from '../styledComponents/nav';
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
            <StyledNav>
                {isTablet && <BreadCrumb />}
                <NavMenuList />
            </StyledNav>
            <NavMenuFooter />
        </VStack>
    );
}
