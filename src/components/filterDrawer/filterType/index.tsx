import { Checkbox, CheckboxIcon, Heading, VStack } from '@chakra-ui/react';

export default function FilterType({
    name,
    list,
    onChange,
}: {
    name: string;
    list: string[];
    onChange: React.Dispatch<React.SetStateAction<string[]>>;
}) {
    return (
        <VStack width='100%' alignItems='flex-start'>
            <Heading as='h5' size='h5' fontSize='16px' fontWeight='500'>
                {name}
            </Heading>
            <VStack alignItems='flex-start'>
                {list.map((e) => (
                    <Checkbox
                        key={e}
                        borderColor='#D7FF94'
                        onChange={() =>
                            onChange((prev) =>
                                prev.includes(e) ? prev.filter((item) => item !== e) : [...prev, e],
                            )
                        }
                        colorScheme='customgreen'
                        icon={
                            <CheckboxIcon
                                sx={{
                                    color: 'black',
                                }}
                            />
                        }
                    >
                        {e}
                    </Checkbox>
                ))}
            </VStack>
        </VStack>
    );
}
