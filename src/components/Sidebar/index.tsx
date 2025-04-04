import './style.css';

import { VStack } from '@chakra-ui/react';

import SidebarFooter from './sidebarFooter';
import SidebarItems from './sidebarItems';
import { sidebarData } from './sidebarItems/sidebarData';

export default function SideBar() {
    return (
        <VStack
            className='sidebar'
            gap='22.5px'
            alignItems='flex-start'
            justify='space-between'
            height='100%'
        >
            <SidebarItems sidebarData={sidebarData} />
            <SidebarFooter />
        </VStack>
    );
}
