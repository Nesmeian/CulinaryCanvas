import { HStack, Image, Text, VStack } from '@chakra-ui/react';

import { navMenuItemsProps } from '~/types/navMenuTypes';

import vector from '../../../assets/vector.svg';

export default function NavMenuItems({ navMenuData }: navMenuItemsProps) {
    return (
        <VStack gap='22.3px'>
            {navMenuData.map(({ name, imgUrl }) => (
                <HStack key={name} className='navMenu__item'>
                    <HStack gap='12px' className='navMenu__item-inner'>
                        <Image src={imgUrl} alt={name} />
                        <Text className='navMenu__item_text' variant='navMenuItems'>
                            {name}
                        </Text>
                    </HStack>
                    <Image src={vector} className='navMenu__item_vector' alt='vector' />
                </HStack>
            ))}
        </VStack>
    );
}
