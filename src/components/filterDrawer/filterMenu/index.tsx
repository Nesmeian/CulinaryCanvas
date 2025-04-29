import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Checkbox, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

import lowerCaseFirstLetter from '~/utils/lowerCaseFirstLetter';

export default function FilterCategories({
    name,
    list,
    onChange,
    selectedItems,
}: {
    name: string;
    selectedItems: string[];
    list: string[];
    onChange: React.Dispatch<React.SetStateAction<string[]>>;
}) {
    const handleCheckboxChange = (value: string) => {
        onChange((prev) => (prev.includes(value) ? [] : [value]));
    };

    const activeTitle = selectedItems.length === 1 ? selectedItems[0] : name;

    return (
        <Menu closeOnSelect={false}>
            <MenuButton
                data-test-id={`filter-menu-button-${lowerCaseFirstLetter(name)}`}
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
                {activeTitle}
            </MenuButton>
            <MenuList width='100%' zIndex={30}>
                {list.map((e) => (
                    <MenuItem key={e} px={0}>
                        <Checkbox
                            data-test-id={`checkbox-${lowerCaseFirstLetter(e)}`}
                            onChange={() => handleCheckboxChange(e)}
                            isChecked={selectedItems.includes(e)}
                            width='100%'
                            pl='16px'
                        >
                            {e}
                        </Checkbox>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}
