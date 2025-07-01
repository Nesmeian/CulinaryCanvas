import { Grid, Heading, VStack } from '@chakra-ui/react';

import { Loader } from '~/components/loader';

import { useGetBlogsQuery } from '../../model/slice';
import { FavoriteItem } from './FavoriteItem';
import { favoriteSectionWrapperStl } from './style';

export const FavoriteSection = () => {
    const { data, isLoading } = useGetBlogsQuery();
    const favoritesData = data?.favorites;
    if (isLoading) {
        return <Loader />;
    }
    return (
        <>
            {favoritesData?.length && (
                <VStack {...favoriteSectionWrapperStl}>
                    <Heading as='h3' size='h3'>
                        Избранные блоги
                    </Heading>
                    <Grid templateColumns='repeat(2, 1fr)' gap='16px'>
                        {favoritesData.map((item) => (
                            <FavoriteItem key={item._id} blog={item} />
                        ))}
                    </Grid>
                </VStack>
            )}
        </>
    );
};
