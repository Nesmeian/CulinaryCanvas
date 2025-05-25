import { Button, Heading, Image, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { newRecipeStepsType } from '~/types/NewRecipesTypes';

import * as AddIcons from '../../../assets/addIcon/index';
import { newRecipeHeadingStyle } from '../componentStyles';
import { StepsList } from './StepsList';
export const RecipeStepsBlock = () => {
    const [steps, setSteps] = useState<newRecipeStepsType>([
        { step: 1, description: '', image: '' },
    ]);
    const addStep = () => {
        setSteps((prev) => [
            ...prev,
            {
                step: prev.length + 1,
                description: '',
                image: '',
            },
        ]);
    };
    return (
        <VStack w='100%'>
            <Heading as='h3' {...newRecipeHeadingStyle} alignSelf='flex-start'>
                Добавьте шаги приготовления
            </Heading>
            <StepsList steps={steps} setSteps={setSteps} />
            <Button
                alignSelf='flex-end'
                variant='plain'
                rightIcon={<Image src={AddIcons.WhiteCenter} alt='add icon' boxSize='14px' />}
                border='1px solid rgba(0, 0, 0, 0.48)'
                onClick={addStep}
            >
                Новый шаг
            </Button>
        </VStack>
    );
};
