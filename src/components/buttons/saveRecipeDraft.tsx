import { Button, HStack } from '@chakra-ui/react';
import { FieldValues, UseFormGetValues } from 'react-hook-form';

import { useSaveDraftMutation } from '~/query/services/post/saveDrawer';

import { Alert } from '../alert';
import { Loader } from '../loader';

export const SaveRecipeDraft = ({
    values,
    onSaveSuccess,
    variant,
    setSavedSuccessfully,
}: {
    values: UseFormGetValues<FieldValues>;
    onSaveSuccess?: () => void;
    variant: string;
    setSavedSuccessfully?: (value: React.SetStateAction<boolean>) => void;
}) => {
    const [saveDraft, { isLoading, isSuccess, isError }] = useSaveDraftMutation();
    const saveDraftHandler = async () => {
        const currentValues = values();
        const draftPayload = {
            ...currentValues,
            description: currentValues.description?.trim() || null,
            image: currentValues.image || null,
            portions: currentValues.portions || null,
            time: currentValues.time || null,
            categoriesIds:
                Array.isArray(currentValues.categoriesIds) && currentValues.categoriesIds.length > 0
                    ? currentValues.categoriesIds
                    : null,
            ingredients: Array.isArray(currentValues.ingredients)
                ? currentValues.ingredients
                      .filter((i) => !!i.title && !!i.count && !isNaN(Number(i.count)))
                      .map((i) => ({
                          title: i.title.trim(),
                          count: Number(i.count),
                          measureUnit: i.measureUnit?.trim() || null,
                      }))
                : null,
            steps:
                Array.isArray(currentValues.steps) && currentValues.steps.length > 0
                    ? currentValues.steps.map((step, idx) => ({
                          stepNumber: idx + 1,
                          description: step.description?.trim() || null,
                          image: step.image || null,
                      }))
                    : null,
        };

        if (currentValues.title) {
            try {
                await saveDraft(draftPayload).unwrap();
                onSaveSuccess?.();
                if (setSavedSuccessfully) {
                    setSavedSuccessfully(true);
                }
            } catch (error) {
                console.log('Ошибка при сохранении черновика:', error);
            }
        }
    };
    return (
        <HStack>
            <Button variant={variant} onClick={saveDraftHandler}>
                Сохранить в черновик
            </Button>
            {isLoading && <Loader />}
            {isSuccess && <Alert isSuccessCheck successMessage='Рецепт успешно опубликован' />}
            {isError && <Alert />}
        </HStack>
    );
};
