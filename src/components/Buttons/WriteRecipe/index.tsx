import './index.css';

import { Button, Heading, Image, VStack } from '@chakra-ui/react';

import writeRecipe from '../../../assets/writeRecipe.svg';
export default function WriteRecipeButton() {
    return (
        <Button className='write-recipe-btn'>
            <VStack className='write-recipe-btn__icon-box' gap='12.5px'>
                <Image
                    className='write-recipe-btn__icon'
                    src={writeRecipe}
                    alt='icon recipe create'
                />
                <Heading className='write-recipe-btn__label' as='span'>
                    Записать рецепт
                </Heading>
            </VStack>
        </Button>
    );
}
