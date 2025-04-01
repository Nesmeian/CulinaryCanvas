import './style.css';

import { Heading, HStack, Image, VStack } from '@chakra-ui/react';

import vector from '../../assets/vector.svg';
import { sideBarItems } from './sidebarItems';

export default function SideBar() {
    return (
        <VStack className='sidebar' gap='23px'>
            {sideBarItems.map(({ name, imgUrl }) => (
                <HStack className='sidebar__item'>
                    <HStack gap='12px' className='sidebar__item-inner'>
                        <Image src={imgUrl}></Image>
                        <Heading as='p' className='sidebar__item_text'>
                            {name}
                        </Heading>
                    </HStack>
                    <Image src={vector} className='sidebar__item_vector' />
                </HStack>
            ))}
        </VStack>
    );
}
