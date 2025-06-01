import { Button, HStack } from '@chakra-ui/react';
import { FieldValues, UseFormGetValues } from 'react-hook-form';

import { useSaveDraftMutation } from '~/query/services/post/saveDrawer';

import { Alert } from '../alert';
import { Loader } from '../loader';

export const SaveRecipeDraft = ({
    values,
    onSaveSuccess,
}: {
    values: UseFormGetValues<FieldValues>;
    onSaveSuccess?: () => void;
}) => {
    const [saveDraft, { isLoading, isSuccess }] = useSaveDraftMutation();
    const saveDraftHandler = async () => {
        const currentValues = values();
        if (currentValues.title) {
            try {
                await saveDraft(currentValues).unwrap();
                onSaveSuccess?.();
            } catch (error) {
                console.log('Ошибка при сохранении черновика:', error);
            }
        }
    };
    return (
        <HStack>
            <Button w='246px' variant='plain' onClick={saveDraftHandler}>
                Сохранить в черновик
            </Button>
            {isLoading && <Loader />}
            {isSuccess && <Alert isSuccessCheck successMessage='Рецепт успешно опубликован' />}
        </HStack>
    );
};
