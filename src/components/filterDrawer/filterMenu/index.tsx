import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList, Portal } from '@chakra-ui/react';

export default function FilterCategories({ name, list }: { name: string; list: string[] }) {
    return (
        <Menu>
            <MenuButton
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
            <Portal>
                <MenuList width='100%' zIndex={30}>
                    {list.map((e) => (
                        <MenuItem key={e} width='400px' zIndex={30}>
                            {e}
                        </MenuItem>
                    ))}
                </MenuList>
            </Portal>
        </Menu>
    );
}
