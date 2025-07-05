import { Grid, GridItem, Heading, VStack } from '@chakra-ui/react';

import { Loader } from '~/components/loader';

import { useGetBlogsQuery } from '../../model/slice';
import { FavoriteItem } from './FavoriteItem';
import { favoriteSectionWrapperStl, getFavoriteSectionGridStl } from './style';

export const FavoriteSection = () => {
    const { data, isLoading } = useGetBlogsQuery();
    const favoritesData = data?.favorites;
    const count = favoritesData?.length ?? 0;
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
                    <Grid {...getFavoriteSectionGridStl(count)}>
                        {favoritesData.map((item, idx) => {
                            const isLastOdd = count % 2 === 1 && idx === count - 1;
                            return (
                                <GridItem
                                    colSpan={{ base: 1, md: isLastOdd ? 2 : 1 }}
                                    key={item._id}
                                >
                                    <FavoriteItem blog={item} />
                                </GridItem>
                            );
                        })}
                    </Grid>
                </VStack>
            )}
        </>
    );
};
