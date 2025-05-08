import './style.css';

import { Heading, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGetRecipesQuery } from '~/query/services/get';
import { ApplicationState } from '~/store/configure-store';
import { cleanSearch, setFindState } from '~/store/searchSlice';
import GetCurrentPath from '~/utils/getCurrentPath';

import BigCardsList from '../bigCardsList';
import { SearchLoader } from '../loader/searchLoader';
import Search from '../Search';
import BottomSection from '../sections/bottomsection';
import CulinaryBlogs from '../sections/culinaryBlogs';
import Juiciest from '../sections/Juiciest';
import Slider from '../slider';
import MainStyled from '../styledComponents/Main';

export default function Main() {
    const curentPath = GetCurrentPath();
    const pathString = curentPath.join('/');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(cleanSearch());
    }, [dispatch, pathString]);
    const allergensActive = useSelector((state: ApplicationState) => state.allergensSlice.isActive);
    const searchQuery = useSelector((state: ApplicationState) => state.searchState.search);
    const allowSearch = useSelector((state: ApplicationState) => state.searchState.allowSearch);
    const allergenList = useSelector((state: ApplicationState) => state.allergensSlice.allergens);
    const {
        data: searchData,
        isLoading,
        isFetching,
    } = useGetRecipesQuery(
        {
            limit: 8,
            searchString: searchQuery,
            ...(allergensActive && { allergens: allergenList.join('') }),
        },
        { skip: !allowSearch },
    );
    useEffect(() => {
        if (!allowSearch) {
            dispatch(setFindState('common'));
        } else {
            dispatch(setFindState(searchData?.data.length > 0 ? 'find' : 'not found'));
        }
    }, [allowSearch, searchData, dispatch]);
    return (
        <MainStyled as='main'>
            <VStack
                p={{ lg: '30px', base: '16px ' }}
                borderRadius='0  0 8px 8px'
                boxShadow='0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(0, 0, 0, 0.1);'
            >
                <Heading as='h1' size='h1' className='title'>
                    Приятного аппетита!
                </Heading>

                {!isLoading || !isFetching ? <Search /> : <SearchLoader />}
            </VStack>

            {!allowSearch ? (
                <>
                    <Slider />
                    <Juiciest />
                    <CulinaryBlogs />
                    <BottomSection isRandom />
                </>
            ) : (
                !isLoading && <BigCardsList data={searchData?.data} />
            )}
        </MainStyled>
    );
}
