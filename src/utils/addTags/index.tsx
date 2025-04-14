import './style.css';

import { HStack, Image, Text } from '@chakra-ui/react';

import TagsProps from '../../types/utilsTypes';
import tagsKeys from './tagsImgData';

export default function AddTags({ tag, withText, color, size, newPosition }: TagsProps) {
    const position = newPosition ? 'static' : 'absolute';
    return (
        <HStack
            className='tag'
            position={{ lg: 'static', sm: position }}
            background={color}
            gap={{ sm: '9px' }}
        >
            <Image
                objectFit='cover'
                className='tag__img'
                boxSize={size}
                src={tagsKeys[tag]}
                alt={tag}
                m='0'
            />
            {withText && <Text variant='addTag'>{tag}</Text>}
        </HStack>
    );
}
