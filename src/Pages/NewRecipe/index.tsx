import { HStack, Image, useDisclosure } from '@chakra-ui/react';
import { chakra } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { Alert } from '~/components/alert';
import { DropImageModal } from '~/components/dropImageModal';
import { Loader } from '~/components/loader';
import { RecipeBuilder } from '~/components/NewRecipeComponents/RecipeBuilder';
import { RecipeMainInf } from '~/components/NewRecipeComponents/RecipeMainInf';
import { useBlockNavigation } from '~/components/NewRecipeComponents/refreshDraft';
import MainStyled from '~/components/styledComponents/Main';
import { useModal } from '~/context/mainContext/useContext';
import { useGetCategoryId } from '~/Hooks/useGetCategoryAndSubCategoryId';
import { useGetRecipeByIdQuery } from '~/query/services/get';
import { useCreateNewRecipeMutation } from '~/query/services/post/newRecipe';
import { RecipeFields, UploadedFile } from '~/types/NewRecipesTypes';
import { newRecipeScheme } from '~/utils/validationRules/newRecipeScheme';

import emptyImg from '../../assets/emptyImage.png';
import { RecipeImgStyles } from './styles';

export const NewRecipe = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const {
        data: editData,
        isLoading: editRecipeLoading,
        isError: editError,
    } = useGetRecipeByIdQuery(id ?? skipToken);

    const { isOpen, onClose, onOpen } = useDisclosure();
    const [createNewRecipe, { isLoading, isError, isSuccess }] = useCreateNewRecipeMutation();
    const [createdRecipeId, setCreatedRecipeId] = useState<string | null>(null);
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const { subCategoryData, category } = useGetCategoryId(categoryId || undefined);
    const [savedSuccessfully, setSavedSuccessfully] = useState(false);
    const methods = useForm<RecipeFields>({
        mode: 'onChange',
        resolver: yupResolver(newRecipeScheme),
        defaultValues: {
            title: '',
            description: '',
            image: '',
            portions: 0,
            time: 0,

            categoriesIds: [],
            ingredients: [{ title: '', count: '0', measureUnit: '' }],
            steps: [{ description: '', image: '' }],
        },
    });
    useEffect(() => {
        if (createdRecipeId && category && subCategoryData) {
            const mainCategory = category.category || 'snacks';
            const subCategory = subCategoryData.category || 'meat-snacks';

            navigate(`/${mainCategory}/${subCategory}/${createdRecipeId}`);
        }
    }, [createdRecipeId, category, subCategoryData, navigate]);
    useEffect(() => {
        if (editData) {
            methods.reset({
                ...editData,
            });
        }
    }, [editData, methods]);
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
            setSavedSuccessfully(true);
            setCreatedRecipeId(result._id);
            setCategoryId(result.categoriesIds[0]);
        } catch (err) {
            console.error('Ошибка при создании рецепта:', err);
        }
    };
    const {
        handleSubmit,
        watch,
        formState: { errors, isDirty },
        getValues,
        setValue,
    } = methods;
    const handleImageSave = (uploaded: UploadedFile) => {
        const API_BASE = 'https://training-api.clevertec.ru';
        const fullUrl = uploaded.url.startsWith('http')
            ? uploaded.url
            : `${API_BASE}${uploaded.url}`;

        const relativeUrl = fullUrl.replace(API_BASE, '');
        setValue('image', relativeUrl, {
            shouldValidate: true,
            shouldDirty: true,
        });

        onClose();
    };
    const { open } = useModal();
    useBlockNavigation({
        isFormDirty: isDirty,
        open,
        close,
        values: getValues,
        isSavedSuccessfully: savedSuccessfully,
    });
    const imageValue = watch('image');
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
                                src={
                                    imageValue
                                        ? imageValue.startsWith('/')
                                            ? `https://training-api.clevertec.ru${imageValue}`
                                            : imageValue
                                        : emptyImg
                                }
                                onClick={onOpen}
                                cursor='pointer'
                                alt='recipe preview'
                            />
                            <RecipeMainInf />
                        </HStack>
                        <RecipeBuilder setSavedSuccessfully={setSavedSuccessfully} />
                    </chakra.form>
                </HStack>
                <DropImageModal
                    isOpen={isOpen}
                    initImage={
                        imageValue ? `https://training-api.clevertec.ru${imageValue}` : emptyImg
                    }
                    onClose={onClose}
                    onSave={handleImageSave}
                />
            </FormProvider>
            {(isLoading || editRecipeLoading) && <Loader />}
            {(isError || editError) && <Alert />}
            {isSuccess && <Alert isSuccessCheck successMessage='Рецепт успешно опубликован' />}
        </MainStyled>
    );
};
