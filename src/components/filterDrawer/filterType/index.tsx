import { Checkbox, Heading, VStack } from '@chakra-ui/react';

export default function FilterType({ name, list }: { name: string; list: string[] }) {
    return (
        <VStack width='100%' alignItems='flex-start'>
            <Heading as='h5' size='h5' fontSize='16px' fontWeight='500'>
                {name}
            </Heading>
            <VStack alignItems='flex-start'>
                {list.map((e) => (
                    <Checkbox borderColor='#d7ff94'>{e}</Checkbox>
                ))}
            </VStack>
        </VStack>
    );
}
