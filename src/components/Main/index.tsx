import './style.css';

import { HStack } from '@chakra-ui/react';

import SideBar from '../Sidebar';

export default function Main() {
    return (
        <HStack className='main'>
            <SideBar />;
        </HStack>
    );
}
