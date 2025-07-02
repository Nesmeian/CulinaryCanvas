import './style.css';

import { Grid, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { LoadMoreBtn } from '~/shared/ui/loadMore';
import { ApplicationState } from '~/store/configure-store';
import { ComingRecipeData } from '~/types/comingData';

import { BigCardItem } from './bigCardItem';

export default function BigCardsList({
    data,
    loadMore,
    hasMore,
}: {
    hasMore: boolean;
    data: ComingRecipeData[];
    loadMore: (value: React.SetStateAction<number>) => void;
}) {
    const searchStr = useSelector((store: ApplicationState) => store.searchState.search).length;
    return (
        <VStack gap='16px'>
            <Grid className='card__list' gap={{ xl: '24px', md: '16px', sm: '11px' }}>
                {data.map((recipe, i) => (
                    <BigCardItem key={recipe._id} recipe={recipe} i={i} searchStr={searchStr} />
                ))}
            </Grid>
            {hasMore && <LoadMoreBtn loadMore={loadMore} />}
        </VStack>
    );
}
