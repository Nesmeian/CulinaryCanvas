import { Checkbox, CheckboxIcon, Heading, VStack } from '@chakra-ui/react';
export interface FilterTypeProps<K extends string> {
    name: string;
    list: Record<K, string>;
    onChange: React.Dispatch<React.SetStateAction<string[]>>;
    selectedItems: string[];
}
export default function FilterType<K extends string>({
    name,
    list,
    onChange,
    selectedItems,
}: FilterTypeProps<K>) {
    return (
        <VStack width='100%' alignItems='flex-start'>
            <Heading as='h5' size='h5' fontSize='16px' fontWeight='500'>
                {name}
            </Heading>
            <VStack alignItems='flex-start'>
                {(Object.entries(list) as [K, string][]).map(([rus, eng]) => (
                    <Checkbox
                        data-test-id={`checkbox-${rus}`}
                        key={rus}
                        borderColor='#D7FF94'
                        colorScheme='customgreen'
                        icon={<CheckboxIcon sx={{ color: 'black' }} />}
                        isChecked={selectedItems.includes(eng)}
                        onChange={() =>
                            onChange((prev: string[]): string[] =>
                                prev.includes(eng)
                                    ? prev.filter((item) => item !== eng)
                                    : [...prev, eng],
                            )
                        }
                    >
                        {rus}
                    </Checkbox>
                ))}
            </VStack>
        </VStack>
    );
}
