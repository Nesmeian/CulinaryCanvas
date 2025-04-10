import { HStack, Image, Text, VStack } from '@chakra-ui/react';

import DB from '~/data/db.json';

import * as navMenuIcons from '../../../assets/navMenuIcons/index';
import vector from '../../../assets/vector.svg';
export default function NavMenuItems() {
    return (
        <VStack gap='24px' className='navMenu__list'>
            {DB.navMenu.map(({ name, imgUrl }) => (
                <HStack key={name} className='navMenu__item'>
                    <HStack gap='12px' className='navMenu__item-inner'>
                        <Image src={navMenuIcons[imgUrl as keyof typeof navMenuIcons]} alt={name} />
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
