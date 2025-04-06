import { HStack, Image, Text } from '@chakra-ui/react';

import TagsProps from '~/types/sliderTypes';

import tagsKeys from './tagsImgData';

export default function Tags({ tag }: TagsProps) {
    return (
        <HStack background='#d7ff94' padding='1px 9px' borderRadius='4px'>
            <Image boxSize='16px' src={tagsKeys[tag]} alt={tag} />
            <Text variant='sliderTag'>{tag}</Text>
        </HStack>
    );
}
