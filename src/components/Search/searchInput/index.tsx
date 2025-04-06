import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';

export default function InputSearch() {
    return (
        <InputGroup size='lg'>
            <Input
                placeholder='Название или ингредиент...'
                _placeholder={{ color: '#134b00', fontSize: '19.2px' }}
                fontSize='18px'
                width='458px'
                className='search__input'
                border='1px solid rgba(0, 0, 0, 0.48)'
            />
            <InputRightElement marginRight='6px'>
                <SearchIcon />
            </InputRightElement>
        </InputGroup>
    );
}
