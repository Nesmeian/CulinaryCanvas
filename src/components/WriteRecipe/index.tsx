import './index.css';

import { Image, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import writeRecipe from '../../assets/writeRecipe.svg';

export default function WriteRecipeButton() {
    return (
        <VStack
            as={Link}
            to='/new-recipe'
            className='recipe-action__container'
            gap='9px'
            justify='center'
            alignItems='center'
        >
            <Image className='recipe-action__icon' src={writeRecipe} alt='icon write recipe' />
            <Text className='recipe-action__label' variant='writeRecipeTextStyle' as='span'>
                Записать рецепт
            </Text>
        </VStack>
    );
}
