import { Checkbox, FormControl, FormLabel, HStack, Select, Switch } from '@chakra-ui/react';

export default function SearchControls() {
    const alergens = {
        'Молочные продукты': 'Dairy products',
        Яйцо: 'Egg',
        Рыба: 'Fish',
        Моллюски: 'Shellfish',
        Орехи: 'Nuts',
        'Томат (помидор)': 'Tomato',
        Цитрусовые: 'Citrus',
        'Клубника (ягоды)': 'Strawberry (berries)',
        Шоколад: 'Chocolate',
    };
    return (
        <FormControl
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            p='0 8px'
            gap='20px'
        >
            <HStack gap='16px'>
                <FormLabel m='0' fontSize='16.5px'>
                    Исключить мои аллергены
                </FormLabel>
                <Switch
                    sx={{
                        'span.chakra-switch__track': {
                            bg: 'rgba(0, 0, 0, 0.16)',
                            _checked: {
                                bg: '#b1ff2e',
                            },
                        },

                        'span.chakra-switch__thumb': {
                            bg: 'white',
                        },
                    }}
                />
            </HStack>
            <Select fontSize='17.5px' width='234px' placeholder='Выберите из списка...'>
                {Object.entries(alergens).map(([key, value]) => (
                    <option key={key}>
                        <Checkbox>{value}</Checkbox>
                    </option>
                ))}
            </Select>
        </FormControl>
    );
}
