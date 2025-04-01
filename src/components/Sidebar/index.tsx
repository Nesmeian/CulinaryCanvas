import './style.css';

import { VStack } from '@chakra-ui/react';

import { sideBarItems } from './sidebarItems';

export default function SideBar() {
    return (
        <VStack className='sideBar'>
            {sideBarItems.map(({ imgUrl }) => (
                <img src={imgUrl}></img>
            ))}
        </VStack>
    );
}
