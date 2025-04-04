import './index.css';

import { Button, Image, Text, VStack } from '@chakra-ui/react';

import writeRecipe from '../../../assets/writeRecipe.svg';

export default function WriteRecipeButton() {
    return (
        <Button className='write-recipe-btn' variant='plain'>
            <VStack className='write-recipe-btn__icon-box' gap='12.5px'>
                <Image
                    className='write-recipe-btn__icon'
                    src={writeRecipe}
                    alt='icon recipe create'
                />
                <Text className='write-recipe-btn__label' as='span'>
                    Записать рецепт
                </Text>
            </VStack>
        </Button>
    );
}
