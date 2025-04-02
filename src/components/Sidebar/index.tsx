import './style.css';

import { VStack } from '@chakra-ui/react';

import SidebarItems from './sidebarItems';
import { sidebarData } from './sidebarItems/sidebarData';

export default function SideBar() {
    return (
        <VStack className='sidebar' gap='22.5px'>
            <SidebarItems sidebarData={sidebarData} />
        </VStack>
    );
}
