import { HStack, Image, useDisclosure } from '@chakra-ui/react';
import { chakra } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { Alert } from '~/components/alert';
import { DropImageModal } from '~/components/dropImageModal';
import { Loader } from '~/components/loader';
import { RecipeBuilder } from '~/components/NewRecipeComponents/RecipeBuilder';
import { RecipeMainInf } from '~/components/NewRecipeComponents/RecipeMainInf';
import MainStyled from '~/components/styledComponents/Main';
import { useGetCategoryId } from '~/Hooks/useGetCategoryAndSubCategoryId';
import { useCreateNewRecipeMutation } from '~/query/services/post/newRecipe';
import { RecipeFields, UploadedFile } from '~/types/NewRecipesTypes';
import { newRecipeScheme } from '~/utils/validationRules/newRecipeScheme';

import emptyImg from '../../../assets/emptyImage.png';
import { RecipeImgStyles } from './styles';

export const NewRecipe = () => {
    const navigate = useNavigate();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [recipeImg, setRecipeImage] = useState(emptyImg);
    const [createNewRecipe, { isLoading, isError, isSuccess }] = useCreateNewRecipeMutation();
    const [createdRecipeId, setCreatedRecipeId] = useState<string | null>(null);
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const { subCategoryData, category } = useGetCategoryId(categoryId || undefined);
    const methods = useForm<RecipeFields>({
        mode: 'onChange',
        resolver: yupResolver(newRecipeScheme),
        defaultValues: {
            time: 30,
            portions: 4,
            steps: [
                {
                    description: '',
                    image: undefined,
                },
            ],
        },
    });
    useEffect(() => {
        if (createdRecipeId && category && subCategoryData) {
            const mainCategory = category.category || 'snacks';
            const subCategory = subCategoryData.category || 'meat-snacks';

            navigate(`/${mainCategory}/${subCategory}/${createdRecipeId}`);
        }
    }, [createdRecipeId, category, subCategoryData, navigate]);
    const onSubmit: SubmitHandler<RecipeFields> = async (data) => {
        const payload = {
            ...data,
            steps: data.steps.map((step, idx) => ({
                stepNumber: idx + 1,
                description: step.description,
                image: step.image,
            })),
        };

        try {
            const result = await createNewRecipe(payload).unwrap();

            setCreatedRecipeId(result._id);
            setCategoryId(result.categoriesIds[0]);
        } catch (err) {
            console.error('Ошибка при создании рецепта:', err);
        }
    };
    const {
        handleSubmit,
        formState: { errors },
        setValue,
    } = methods;
    const handleImageSave = (uploaded: UploadedFile) => {
        const API_BASE = 'https://training-api.clevertec.ru';
        const fullUrl = uploaded.url.startsWith('http')
            ? uploaded.url
            : `${API_BASE}${uploaded.url}`;

        const relativeUrl = fullUrl.replace(API_BASE, '');

        setRecipeImage(fullUrl);

        setValue('image', relativeUrl, {
            shouldValidate: true,
            shouldDirty: true,
        });

        onClose();
    };

    return (
        <MainStyled as='main'>
            <FormProvider {...methods}>
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
                                cursor='pointer'
                                alt='recipe preview'
                            />
                            <RecipeMainInf />
                        </HStack>
                        <RecipeBuilder />
                    </chakra.form>
                </HStack>
                <DropImageModal
                    isOpen={isOpen}
                    initImage={recipeImg}
                    onClose={onClose}
                    onSave={handleImageSave}
                />
            </FormProvider>
            {isLoading && <Loader />}
            {isError && <Alert />}
            {isSuccess && <Alert isSuccessCheck successMessage='Рецепт успешно опубликован' />}
        </MainStyled>
    );
};
