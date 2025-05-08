import { Text } from '@chakra-ui/react';

export const renderColoredHeading = (title: string, searchLength: number) => {
    if (searchLength === 0) {
        return title;
    }
    const chars = Array.from(title);

    return (
        <>
            {chars.map((char, index) => (
                <Text as='span' key={index} color={index < searchLength ? 'green.500' : 'black'}>
                    {char}
                </Text>
            ))}
        </>
    );
};
