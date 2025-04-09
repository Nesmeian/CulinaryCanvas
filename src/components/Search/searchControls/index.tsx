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
                        'span.chakra-switch__track': {
                            bg: 'rgba(0, 0, 0, 0.16)',
                            _checked: {
                                bg: 'blue',
                            },
                        },

                        'span.chakra-switch__thumb': {
                            bg: 'white',
                        },
                    }}
                />
            </HStack>
            <Select fontSize='17.5px' width='234px' placeholder='Выберите из списка...' />
        </FormControl>
    );
}
