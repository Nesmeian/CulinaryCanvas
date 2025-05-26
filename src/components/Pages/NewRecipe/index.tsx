import { HStack, Image, useDisclosure } from '@chakra-ui/react';
import { chakra } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { DropImageModal } from '~/components/dropImageModal';
import { RecipeBuilder } from '~/components/NewRecipeComponents/RecipeBuilder';
import { RecipeMainInf } from '~/components/NewRecipeComponents/RecipeMainInf';
import MainStyled from '~/components/styledComponents/Main';
import { RecipeFields } from '~/types/NewRecipesTypes';
import { newRecipeScheme } from '~/utils/validationRules/newRecipeScheme';

import emptyImg from '../../../assets/emptyImage.png';
import { RecipeImgStyles } from './styles';

export const NewRecipe = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [recipeImg, setRecipeImage] = useState(emptyImg);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<RecipeFields>({
        mode: 'onChange',
        resolver: yupResolver(newRecipeScheme),
    });
    const onSubmit: SubmitHandler<RecipeFields> = (data) => {
        console.log(data, 'data');
    };
    const handleImageSave = (file: File) => {
        setValue('image', file, { shouldValidate: true });
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
                        <Image
                            {...RecipeImgStyles}
                            border={errors.image ? '1px solid' : 'none'}
                            borderColor='red.500'
                            src={recipeImg}
                            onClick={onOpen}
                        />
                        <RecipeMainInf register={register} errors={errors} setValue={setValue} />
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
