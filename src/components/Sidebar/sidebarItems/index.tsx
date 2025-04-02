import { Heading, HStack, Image } from '@chakra-ui/react';

import { SidebarItemsProps } from '~/types/sidebarTypes';

import vector from '../../../assets/vector.svg';

export default function SidebarItems({ sidebarData }: SidebarItemsProps) {
    return (
        <>
            {sidebarData.map(({ name, imgUrl }) => (
                <HStack key={name} className='sidebar__item'>
                    <HStack gap='12px' className='sidebar__item-inner'>
                        <Image src={imgUrl} alt={name} />
                        <Heading as='p' className='sidebar__item_text'>
                            {name}
                        </Heading>
                    </HStack>
                    <Image src={vector} className='sidebar__item_vector' alt='vector' />
                </HStack>
            ))}
        </>
    );
}
