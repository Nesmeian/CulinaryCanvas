import { HStack, Image } from '@chakra-ui/react';

import { RecipeMainInf } from '~/components/NewRecipeComponents/RecipeMainInf';
import MainStyled from '~/components/styledComponents/Main';

import emptyImg from '../../../assets/emptyImage.png';
export const NewRecipe = () => {
    console.log('jack');
    return (
        <MainStyled>
            <HStack w='100%' mt='56px'>
                <form>
                    <HStack alignItems='flex-start' gap={5} h='410px'>
                        <Image src={emptyImg} alt='recipeImg' />
                        <RecipeMainInf />
                    </HStack>
                </form>
            </HStack>
        </MainStyled>
    );
};
