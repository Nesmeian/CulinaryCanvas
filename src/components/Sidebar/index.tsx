import './style.css';

import { VStack } from '@chakra-ui/react';

import SidebarFooter from './sidebarFooter';
import SidebarItems from './sidebarItems';
import { sidebarData } from './sidebarItems/sidebarData';

export default function SideBar() {
    return (
        <VStack className='sidebar' gap='22.5px' alignItems='flex-start'>
            <SidebarItems sidebarData={sidebarData} />
            <SidebarFooter />
        </VStack>
    );
}
