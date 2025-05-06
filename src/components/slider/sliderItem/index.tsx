import '../style.css';

import { Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router';

import { Loader } from '~/components/loader';
import { IMG_PATH } from '~/constants';
import { useGetCategoryId } from '~/Hooks/useGetCategoryAndSubCategoryId';
import useBreakpoints from '~/themes/chakraBreakPoints';
import { ComingRecipeData } from '~/types/comingData';
import AddNotifications from '~/utils/addNotifications';
import AddTags from '~/utils/addTags';

export const SlideItem = ({ recipe }: { recipe: ComingRecipeData }) => {
    const { isTablet } = useBreakpoints();
    const { image, title, description, categoriesIds, bookmarks, likes } = recipe;
    const { subCategoryData, category, loading } = useGetCategoryId(categoriesIds[0]);
    if (loading) {
        return <Loader />;
    }
    return (
        <VStack as={Link} to={`/${category?.category}/${subCategoryData?.category}/${recipe._id}`}>
            <Image height={{ lg: '230px', sm: '128px' }} src={`${IMG_PATH}${image}`} alt={title} />
            <VStack className='slider__item-content' align='flex-start' gap='6px'>
                <VStack
                    className='slider__text-group'
                    alignItems='flex-start'
                    gap='0px'
                    width='100%'
                >
                    <Heading
                        as='h4'
                        size='h4'
                        noOfLines={{ lg: 1, sm: 2 }}
                        sx={{ wordBreak: 'break-all', overflowWrap: 'anywhere' }}
                        className='slider__item-title'
                    >
                        {title}
                    </Heading>
                    {!isTablet && (
                        <Text className='slider__content-description' variant='sectionDescription'>
                            {description}
                        </Text>
                    )}
                </VStack>
                <HStack
                    className='slider__controls'
                    justify={{ lg: 'space-between', base: 'flex-start' }}
                    alignItems='flex-start'
                >
                    <AddTags category={categoriesIds[0]} withText color='#d7ff94' size='16px' />
                    <AddNotifications bookmarks={bookmarks} likes={likes} />
                </HStack>
            </VStack>
        </VStack>
    );
};
