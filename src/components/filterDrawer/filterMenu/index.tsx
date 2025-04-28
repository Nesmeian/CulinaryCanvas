import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Checkbox, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

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
        onChange((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
        );
    };
    return (
        <Menu closeOnSelect={false}>
            <MenuButton
                data-test-id={`filter-menu-button-${name}`}
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
                    <MenuItem key={e} px={0}>
                        <Checkbox
                            data-test-id={`checkbox-${e.charAt(0).toLowerCase()}${e.slice(1)}`}
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
