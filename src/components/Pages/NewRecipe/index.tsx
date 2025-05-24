import { HStack, Image } from '@chakra-ui/react';
import { chakra } from '@chakra-ui/react';

import { RecipeBuilder } from '~/components/NewRecipeComponents/RecipeBuilder';
import { RecipeMainInf } from '~/components/NewRecipeComponents/RecipeMainInf';
import MainStyled from '~/components/styledComponents/Main';

import emptyImg from '../../../assets/emptyImage.png';
export const NewRecipe = () => {
    console.log('jack');
    return (
        <MainStyled as='main'>
            <HStack mt='56px' w='100%'>
                <chakra.form
                    w='calc(100% - 256px)'
                    display='flex'
                    flexDir='column'
                    justifyContent='center'
                    alignItems='center'
                >
                    <HStack alignItems='flex-start' gap={5} h='410px' w='100%'>
                        <Image src={emptyImg} alt='recipeImg' />
                        <RecipeMainInf />
                    </HStack>
                    <RecipeBuilder />
                </chakra.form>
            </HStack>
        </MainStyled>
    );
};
