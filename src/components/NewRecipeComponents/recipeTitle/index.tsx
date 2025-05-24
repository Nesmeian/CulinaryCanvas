import { Input, Textarea, VStack } from '@chakra-ui/react';

export const NewRecipeTitle = () => {
    console.log('title');
    return (
        <VStack w='100%' gap='24px'>
            <Input size='lg' placeholder='Название рецепта'></Input>
            <Textarea h='80px' placeholder='Краткое описание рецепта' />
        </VStack>
    );
};
