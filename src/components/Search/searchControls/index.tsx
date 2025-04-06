import { FormControl, FormLabel, HStack, Select, Switch } from '@chakra-ui/react';

export default function SearchControls() {
    return (
        <FormControl display='flex' alignItems='center' justifyContent='space-between' p='0 8px'>
            <HStack gap='16px'>
                <FormLabel m='0' fontSize='16.5px'>
                    Исключить мои аллергены
                </FormLabel>
                <Switch
                    sx={{
                        // Стили для трека (фона)
                        'span.chakra-switch__track': {
                            bg: 'rgba(0, 0, 0, 0.16)', // Цвет фона
                            _checked: {
                                bg: 'blue', // Цвет при активации
                            },
                        },
                        // Стили для переключателя (thumb)
                        'span.chakra-switch__thumb': {
                            bg: 'white', // Цвет кружка
                        },
                    }}
                />
            </HStack>
            <Select fontSize='17.5px' width='234px' placeholder='Выберите из списка...' />
        </FormControl>
    );
}
