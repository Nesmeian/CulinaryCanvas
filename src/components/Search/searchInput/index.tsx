import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { cleanAllergens, stopAllergens } from '~/store/allergens';
import { closeBurger } from '~/store/burgerSlice';
import { ApplicationState } from '~/store/configure-store';
import { cleanFilterData, closeFilter } from '~/store/filterSlice';
import { setAllowSearch, setSearchState } from '~/store/searchSlice';

export default function InputSearch() {
    const dispatch = useDispatch();
    const searchState = useSelector((state: ApplicationState) => state.searchState.search);

    const [search, setSearch] = useState(searchState);

    useEffect(() => {
        setSearch(searchState);
    }, [searchState]);

    const isBlocked = search.trim().length < 3;

    const handleSearch = () => {
        if (!isBlocked) {
            dispatch(setAllowSearch(true));
            dispatch(setSearchState(search.trim()));
            dispatch(cleanAllergens());
            dispatch(closeBurger());
            dispatch(stopAllergens());
            dispatch(closeFilter());
            dispatch(cleanFilterData());
        }
    };

    const blockSearch = () => {
        dispatch(setAllowSearch(false));
        dispatch(setSearchState(''));
        setSearch('');
    };

    return (
        <InputGroup
            width={{ sm: '284px', md: '404px', lg: '458px' }}
            height={{ sm: '32px', lg: '48px' }}
        >
            <Input
                placeholder='Название или ингредиент...'
                _placeholder={{ color: '#134b00', fontSize: { sm: '15', lg: '19px' } }}
                border='1px solid rgba(0, 0, 0, 0.48)'
                padding='6px'
                height='100%'
                fontSize='16px'
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className='search__input'
            />
            <InputRightElement boxSize={{ sm: '32px', lg: '48px' }} gap='10px' pr='20px'>
                {!isBlocked && (
                    <CloseIcon
                        boxSize={{ sm: '10px', lg: '10px' }}
                        color='blue'
                        onClick={blockSearch}
                    />
                )}
                <SearchIcon
                    boxSize={{ sm: '14px', lg: '18px' }}
                    color={isBlocked ? 'gray.300' : 'gray.600'}
                    onClick={handleSearch}
                    cursor={isBlocked ? 'not-allowed' : 'pointer'}
                />
            </InputRightElement>
        </InputGroup>
    );
}
