import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

export default function FilterCategories({
    name,
    list,
    onClick,
}: {
    name: string;
    list: string[];
    onClick: (value: string) => void;
}) {
    return (
        <Menu>
            <MenuButton
                data-test-id='filter-menu-button-категория'
                height='40px'
                width='100%'
                textAlign='left'
                background='white'
                border='1px solid rgba(0, 0, 0, 0.08)'
                as={Button}
                fontSize='16px'
                color='rgba(0, 0, 0, 0.64)'
                rightIcon={<ChevronDownIcon transition='transform 0.1s' />}
                _active={{
                    background: 'white',
                    border: '1px solid #c4ff61',
                    '& svg': {
                        transform: 'rotate(180deg)',
                    },
                }}
                _hover={{ background: 'white' }}
            >
                {name}
            </MenuButton>
            <MenuList width='100%' zIndex={30}>
                {list.map((e) => (
                    <MenuItem
                        key={e}
                        width={{ lg: '400px', base: '308px' }}
                        zIndex={30}
                        onClick={() => onClick(e)}
                    >
                        {e}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}
