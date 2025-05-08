import './style.css';

import { Grid } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { ApplicationState } from '~/store/configure-store';
import { ComingRecipeData } from '~/types/comingData';

import { BigCardItem } from './bigCardItem';
export default function BigCardsList({ data }: { data: ComingRecipeData[]; categoryTag: string }) {
    const searchStr = useSelector((store: ApplicationState) => store.searchState.search).length;
    const memoizedItems = useMemo(
        () =>
            data.map((recipe, i) => (
                <BigCardItem key={recipe._id} recipe={recipe} i={i} searchStr={searchStr} />
            )),
        [data],
    );
    return (
        <Grid className='card__list' gap={{ xl: '24px', md: '16px', sm: '11px' }}>
            {memoizedItems}
        </Grid>
    );
}
