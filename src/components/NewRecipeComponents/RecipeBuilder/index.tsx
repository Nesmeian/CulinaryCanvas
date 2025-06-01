import { Button, Stack, VStack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { SaveRecipeDraft } from '~/components/buttons/saveRecipeDraft';

import { IngredientsBlock } from '../IngredientsBlock';
import { RecipeStepsBlock } from '../recipeStepsBlock';

export const RecipeBuilder = ({
    setSavedSuccessfully,
}: {
    setSavedSuccessfully: (value: React.SetStateAction<boolean>) => void;
}) => {
    const { getValues } = useFormContext();
    return (
        <VStack w={{ lg: '658px', md: '604px', base: '328px' }} mt={{ base: '44px' }}>
            <IngredientsBlock />
            <RecipeStepsBlock />
            <Stack
                flexDir={{ base: 'column', md: 'row' }}
                w='100%'
                justifyContent='center'
                gap='20px'
            >
                <SaveRecipeDraft values={getValues} setSavedSuccessfully={setSavedSuccessfully} />
                <Button w='246px' type='submit' variant='commonLoginBtn'>
                    Опубликовать рецепт
                </Button>
            </Stack>
        </VStack>
    );
};
