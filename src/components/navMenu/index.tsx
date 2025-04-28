import './style.css';

import { VStack } from '@chakra-ui/react';

import useBreakpoints from '~/themes/chakraBreakPoints';

import BreadCrumb from '../breadCrumb';
import { StyledNav } from '../styledComponents/nav';
import NavMenuFooter from './navMenuFooter';
import NavMenuList from './navMenuList';

export default function NavMenu({ isDrawer }: { isDrawer?: boolean }) {
    const { isTablet } = useBreakpoints();
    return (
        <VStack
            as='nav'
            data-test-id='nav'
            className='navMenu'
            alignItems='flex-start'
            justify='space-between'
            width={{ lg: '256px', base: '100%' }}
            boxShadow={!isDrawer ? '1px 3px 0 rgba(0, 0, 0, 0.12)' : 'none'}
            borderRadius='12px'
        >
            <StyledNav>
                {isTablet && <BreadCrumb />}
                <NavMenuList />
            </StyledNav>
            <NavMenuFooter />
        </VStack>
    );
}
