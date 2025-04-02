import './style.css';

import { Heading, HStack, Image, VStack } from '@chakra-ui/react';

import * as socialImgs from '../../assets/socialIcons/index';
import WriteRecipeButton from '../Buttons/WriteRecipe';
export default function Aside() {
    const asideData = {
        shares: 185,
        views: 589,
        likes: 587,
    };
    return (
        <VStack className='aside' justify='space-between' alignItems='center'>
            <VStack className='aside__profile-notification' gap='22.5px'>
                <HStack className='aside__shares aside__notification-item' gap='8px'>
                    <Image src={socialImgs.shares} /> <Heading as='p'>{asideData.shares}</Heading>
                </HStack>
                <HStack className='aside__views aside__notification-item'>
                    <Image src={socialImgs.views} /> <Heading as='p'>{asideData.views}</Heading>
                </HStack>
                <HStack className='aside__likes aside__notification-item'>
                    <Image src={socialImgs.likes} /> <Heading as='p'>{asideData.likes}</Heading>
                </HStack>
            </VStack>
            <WriteRecipeButton />
        </VStack>
    );
}
