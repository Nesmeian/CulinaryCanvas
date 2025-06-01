import {
    Button,
    ButtonGroup,
    Grid,
    Heading,
    HStack,
    Image,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { Alert } from '~/components/alert';
import { Loader } from '~/components/loader';
import { IMG_PATH } from '~/constants';
import { useDeleteRecipeMutation } from '~/query/services/delete/deleteRecipe';
import {
    useBookmarkRecipeMutation,
    useLikeRecipeMutation,
} from '~/query/services/post/userActions';
import { ComingRecipeData } from '~/types/comingData';
import AddNotifications from '~/utils/addNotifications';
import AddTags from '~/utils/addTags';
import { decodeToken } from '~/utils/decodeToken';

import alarmImg from '../../../assets/alarm.svg';
import deleteRecipeIcon from '../../../assets/deleteRecipeIcon.svg';
import editRecipeIcon from '../../../assets/editRecipeIcon.svg';
import * as socialIcons from '../../../assets/socialIcons/index';
import { commonRecipeBtnStyles, greenRecipeBtnStyles } from '../recipeStyles';

export default function RecipeCard({ recipeData }: { recipeData: ComingRecipeData }) {
    const navigate = useNavigate();
    const { title, _id, description, categoriesIds, image, bookmarks, likes, time } = recipeData;
    const userData = decodeToken(localStorage.getItem('accessToken'));
    const isUserRecipe = userData.userId === recipeData?.authorId;
    const [
        deleteRecipe,
        { isLoading: deleteLoading, isSuccess: deleteSuccess, isError: deleteError },
    ] = useDeleteRecipeMutation();
    const [bookmarkRecipe, { isLoading: bookmarkLoading, isError: bookmarkError }] =
        useBookmarkRecipeMutation();
    const [likeRecipe, { isLoading: likeLoading, isError: likeError }] = useLikeRecipeMutation();
    const deleteRecipeHandler = () => {
        deleteRecipe(recipeData._id);
    };
    const bookmarkRecipeHandler = () => {
        bookmarkRecipe(recipeData._id);
    };
    const likeRecipeHandler = () => {
        likeRecipe(recipeData._id);
    };
    useEffect(() => {
        if (deleteSuccess) {
            navigate('/');
        }
    }, [deleteSuccess, navigate]);
    const isLoading = deleteLoading || bookmarkLoading || likeLoading;
    const isError = deleteError || bookmarkError || likeError;
    return (
        <Grid
            as='section'
            templateColumns={{ lg: 'repeat(2, 1fr)', base: '1fr' }}
            mt={{ lg: '56px', sm: '4px' }}
            width='100%'
            key={_id}
            position='relative'
            _hover={{
                boxShadow:
                    '0 2px 4px -1px rgba(32, 126, 0, 0.06), 0 4px 6px -1px rgba(32, 126, 0, 0.1)',
            }}
            gap={{ lg: '24px', md: '10px' }}
        >
            <Image w='100%' h='100%' src={`${IMG_PATH}${image}`} alt={image} />

            <VStack
                alignSelf='flex-start'
                h='100%'
                align='flex-start'
                rowGap='10px'
                justify='space-between'
            >
                <VStack w='100%' alignItems='flex-start'>
                    <Stack
                        justify='space-between'
                        width='100%'
                        direction='row'
                        mb={{ lg: '28px', md: '14px', base: '26px' }}
                        pr='8px'
                        alignItems='flex-start'
                    >
                        <AddTags
                            category={categoriesIds[0]}
                            withText={true}
                            color='#ffffd3'
                            size='16px'
                            newPosition
                        />
                        <AddNotifications isRecipe bookmarks={bookmarks} likes={likes} />
                    </Stack>
                    <VStack
                        w={{ xl: '70%', sm: '100%' }}
                        gap={{ lg: '28px', md: '10px', base: '16px' }}
                        mb={{ lg: '10px', sm: '15px' }}
                        alignItems='fl'
                    >
                        <Heading
                            noOfLines={2}
                            as='h1'
                            size='h1'
                            lineHeight={{ md: '48px', base: '32px' }}
                        >
                            {title}
                        </Heading>
                        <Text lineHeight='20px' fontSize='14px' noOfLines={3}>
                            {description}
                        </Text>
                    </VStack>
                </VStack>
                <HStack
                    w='100%'
                    alignItems='flex-end'
                    justifyContent='space-between'
                    flexWrap='wrap'
                    gap={{ md: '0', base: '16px' }}
                >
                    <HStack background='rgba(0, 0, 0, 0.06)' borderRadius='4px' pl='10px' pr='24px'>
                        <Image src={alarmImg} alt='alarm image' />
                        <Text whiteSpace='nowrap' fontSize='14px'>
                            {`${time} минут`}
                        </Text>
                    </HStack>
                    {!isUserRecipe ? (
                        <ButtonGroup gap={{ xl: '10px', md: '4px' }}>
                            <Button
                                {...commonRecipeBtnStyles}
                                onClick={likeRecipeHandler}
                                leftIcon={
                                    <Image
                                        boxSize={{ xl: '16px', lg: '14px', sm: '12px' }}
                                        src={socialIcons.likes}
                                        alt='likes img'
                                    />
                                }
                            >
                                Оценить рецепт
                            </Button>
                            <Button
                                {...greenRecipeBtnStyles}
                                onClick={bookmarkRecipeHandler}
                                leftIcon={
                                    <Image
                                        boxSize={{ xl: '16px', lg: '14px', sm: '12px' }}
                                        src={socialIcons.shares}
                                        alt='shares image'
                                    />
                                }
                                size={{
                                    base: 'xs',
                                    lg: 'sm',
                                    xl: 'xl',
                                }}
                            >
                                Сохранить в закладки
                            </Button>
                        </ButtonGroup>
                    ) : (
                        <ButtonGroup gap='16px'>
                            <Button
                                {...commonRecipeBtnStyles}
                                border='none'
                                onClick={deleteRecipeHandler}
                            >
                                <Image src={deleteRecipeIcon} alt='Delete recipe' />
                            </Button>
                            <Button
                                {...commonRecipeBtnStyles}
                                variant='plain'
                                rightIcon={<Image src={editRecipeIcon} alt='edit recipe' />}
                            >
                                Редактировать рецепт
                            </Button>
                        </ButtonGroup>
                    )}
                </HStack>
            </VStack>
            {isLoading && <Loader />}
            {deleteSuccess && <Alert successMessage='YEEEE' isSuccessCheck />}
            {isError && <Alert />}
        </Grid>
    );
}
