import { HStack, Image, useDisclosure } from '@chakra-ui/react';
import { chakra } from '@chakra-ui/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { DropImageModal } from '~/components/dropImageModal';
import { RecipeBuilder } from '~/components/NewRecipeComponents/RecipeBuilder';
import { RecipeMainInf } from '~/components/NewRecipeComponents/RecipeMainInf';
import MainStyled from '~/components/styledComponents/Main';
import { RecipeFields } from '~/types/NewRecipesTypes';

import emptyImg from '../../../assets/emptyImage.png';
import { RecipeImgStyles } from './styles';

export const NewRecipe = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [recipeImg, setRecipeImage] = useState(emptyImg);
    const { handleSubmit, setValue } = useForm<RecipeFields>({ mode: 'onChange' });
    const onSubmit: SubmitHandler<RecipeFields> = (data) => {
        console.log(data, 'data');
    };
    const handleImageSave = (file: File) => {
        setValue('image', file);
    };
    return (
        <MainStyled as='main'>
            <HStack mt='56px' w='100%'>
                <chakra.form
                    onSubmit={handleSubmit(onSubmit)}
                    w='calc(100% - 256px)'
                    display='flex'
                    flexDir='column'
                    justifyContent='center'
                    alignItems='center'
                >
                    <HStack alignItems='flex-start' gap={5} h='410px' w='100%'>
                        <Image {...RecipeImgStyles} src={recipeImg} onClick={onOpen} />
                        <RecipeMainInf />
                    </HStack>
                    <RecipeBuilder />
                </chakra.form>
            </HStack>
            <DropImageModal
                isOpen={isOpen}
                initImage={recipeImg}
                onClose={onClose}
                setRecipeImage={setRecipeImage}
                setFormImage={handleImageSave}
            />
        </MainStyled>
    );
};
