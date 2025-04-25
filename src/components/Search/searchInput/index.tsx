import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setAllowSearch, setSearchState } from '~/store/searchSlice';

export default function InputSearch() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [searchBlock, setSearchBlock] = useState(true);
    const handleSearch = () => {
        if (!searchBlock) {
            dispatch(setAllowSearch(true));
            dispatch(setSearchState(search.trim()));
        }
    };
    const blockSearch = () => {
        dispatch(setAllowSearch(false));
        setSearchBlock(true);
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
                    if (search.length >= 3) {
                        setSearchBlock(false);
                    }
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className='search__input'
            />
            <InputRightElement boxSize={{ sm: '32px', lg: '48px' }} gap='10px' pr='20px'>
                {!searchBlock && (
                    <CloseIcon
                        boxSize={{ sm: '10px', lg: '10px' }}
                        color='blue'
                        onClick={() => blockSearch()}
                    />
                )}
                <SearchIcon
                    boxSize={{ sm: '14px', lg: '18px' }}
                    color='gray'
                    onClick={() => handleSearch()}
                />
            </InputRightElement>
        </InputGroup>
    );
}
