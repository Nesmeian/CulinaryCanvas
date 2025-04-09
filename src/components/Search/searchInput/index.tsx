import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';

export default function InputSearch() {
    return (
        <InputGroup
            size={{ sm: 'sm', lg: 'lg' }}
            width={{ sm: '284px', md: '400px', lg: '458px', xl: '458px' }}
        >
            <Input
                placeholder='Название или ингредиент...'
                _placeholder={{ color: '#134b00', fontSize: { sm: '15', lg: '19px' } }}
                border='1px solid rgba(0, 0, 0, 0.48)'
                fontSize='16px'
                className='search__input'
            />
            <InputRightElement marginRight={{ sm: '0px', lg: '6px' }}>
                <SearchIcon />
            </InputRightElement>
        </InputGroup>
    );
}
