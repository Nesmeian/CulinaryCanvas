import { HStack, Image, VStack } from '@chakra-ui/react';

import { SelectCategory } from '~/components/NewRecipeComponents/selectCategory';
import MainStyled from '~/components/styledComponents/Main';

import emptyImg from '../../../assets/emptyImage.png';
export const NewRecipe = () => {
    console.log('jack');
    return (
        <MainStyled>
            <HStack w='100%'>
                <form>
                    <HStack>
                        <Image src={emptyImg} alt='recipeImg' />
                        <VStack>
                            <SelectCategory />
                        </VStack>
                    </HStack>
                </form>
            </HStack>
        </MainStyled>
    );
};
