import { Heading, HStack, Image, Textarea, VStack } from '@chakra-ui/react';

import { stepTextStyle } from '~/components/recipe/recipeStyles';
import { newRecipeStepsListType } from '~/types/NewRecipesTypes';

import deleteIcon from '../../../assets/deleteIcon.svg';
import emptyImg from '../../../assets/emptyImage.png';
export const StepsList = ({ steps, setSteps }: newRecipeStepsListType) => {
    const handleDescriptionChange = (index: number, value: string) => {
        setSteps((prev) => prev.map((s, i) => (i === index ? { ...s, description: value } : s)));
    };
    const handleDelete = (index: number) => {
        setSteps((prev) => {
            const filtered = prev.filter((_, i) => i !== index);
            return filtered.map((stepObj, i) => ({
                ...stepObj,
                step: i + 1,
            }));
        });
    };
    console.log(steps);
    return steps.map(({ step, description, image }, i) => (
        <HStack
            key={step}
            height='160px'
            w='100%'
            gap='0'
            borderRadius='8px'
            border='1px solid rgba(0, 0, 0, 0.08);'
            overflowY='scroll'
        >
            <Image
                src={image ? image : emptyImg}
                alt='new step img'
                height='100%'
                width={{ base: '328px', md: '346px' }}
                objectFit='cover'
                borderRadius='8px'
            />
            <VStack alignItems='flex-start' p='20px' w={{ base: '322px' }}>
                <HStack justifyContent='space-between' w='100%'>
                    <Heading {...stepTextStyle}>{`Шаг ${step}`}</Heading>
                    {steps.length - 1 !== i && (
                        <Image src={deleteIcon} alt='delete icon' onClick={() => handleDelete(i)} />
                    )}
                </HStack>
                <Textarea
                    onChange={(e) => handleDescriptionChange(i, e.target.value)}
                    placeholder='Шаг'
                    value={description}
                />
            </VStack>
        </HStack>
    ));
};
