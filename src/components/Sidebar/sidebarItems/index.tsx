import { HStack, Image, Text, VStack } from '@chakra-ui/react';

import { SidebarItemsProps } from '~/types/sidebarTypes';

import vector from '../../../assets/vector.svg';

export default function SidebarItems({ sidebarData }: SidebarItemsProps) {
    return (
        <VStack gap='22.3px'>
            {sidebarData.map(({ name, imgUrl }) => (
                <HStack key={name} className='sidebar__item'>
                    <HStack gap='12px' className='sidebar__item-inner'>
                        <Image src={imgUrl} alt={name} />
                        <Text className='sidebar__item_text' variant='sidebarItems'>
                            {name}
                        </Text>
                    </HStack>
                    <Image src={vector} className='sidebar__item_vector' alt='vector' />
                </HStack>
            ))}
        </VStack>
    );
}
