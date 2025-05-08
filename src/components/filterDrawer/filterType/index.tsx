import { Checkbox, CheckboxIcon, Heading, VStack } from '@chakra-ui/react';

import lowerCaseFirstLetter from '~/utils/lowerCaseFirstLetter';
export const FilterType = ({
    name,
    list,
    onChange,
    selectedItems,
}: {
    name: string;
    list: string[];
    onChange: () => void;
    selectedItems: string[];
}) => (
    <VStack width='100%' alignItems='flex-start'>
        <Heading as='h5' size='h5' fontSize='16px' fontWeight='500'>
            {name}
        </Heading>
        <VStack alignItems='flex-start'>
            {list.map((e) => (
                <Checkbox
                    data-test-id={`checkbox-${lowerCaseFirstLetter(e)}`}
                    key={e}
                    borderColor='#D7FF94'
                    colorScheme='customgreen'
                    icon={<CheckboxIcon sx={{ color: 'black' }} />}
                    isChecked={selectedItems.includes(e)}
                    onChange={() =>
                        onChange((prev: string[]): string[] =>
                            prev.includes(e) ? prev.filter((item) => item !== e) : [...prev, e],
                        )
                    }
                >
                    {e}
                </Checkbox>
            ))}
        </VStack>
    </VStack>
);
