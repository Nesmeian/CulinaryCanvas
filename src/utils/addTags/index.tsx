import './style.css';

import { HStack, Image, Text } from '@chakra-ui/react';

import TagsProps from '~/types/utilsTypes';

import tagsKeys from './tagsImgData';

export default function AddTags({ tag, withText, color, size }: TagsProps) {
    return (
        <HStack className='tag' background={color} gap={{ sm: 0 }}>
            <Image className='tag__img' boxSize={size} src={tagsKeys[tag]} alt={tag} />
            {withText && <Text variant='addTag'>{tag}</Text>}
        </HStack>
    );
}
