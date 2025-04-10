import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';

export default function InputSearch() {
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
                className='search__input'
            />
            <InputRightElement boxSize={{ sm: '32px', lg: '48px' }}>
                <SearchIcon boxSize={{ sm: '14px', lg: '18px' }} />
            </InputRightElement>
        </InputGroup>
    );
}
