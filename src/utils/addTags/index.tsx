import { HStack, Image, Text } from '@chakra-ui/react';

import TagsProps from '~/types/utilsTypes';

import tagsKeys from './tagsImgData';

export default function AddTags({ tag, withText }: TagsProps) {
    return (
        <HStack background='#d7ff94' padding='1px 9px' borderRadius='4px'>
            <Image boxSize='16px' src={tagsKeys[tag]} alt={tag} />
            {withText && <Text variant='addTag'>{tag}</Text>}
        </HStack>
    );
}
