import { Button, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { FieldValues, UseFormGetValues } from 'react-hook-form';

import { SaveRecipeDraft } from '~/components/buttons/saveRecipeDraft';
import { LoginCheckTextStyles, LoginModalHeader } from '~/Pages/Login/styles';

import * as img from '../../../assets/LoginImg/index';
export const UnsavedChangesModal = ({
    values,
    onSaveSuccess,
}: {
    values: UseFormGetValues<FieldValues>;
    onSaveSuccess?: () => void;
}) => (
    <VStack>
        <Image src={img.forgetModal} />
        <Heading {...LoginModalHeader}> Выйти без сохранения?</Heading>
        <Text {...LoginCheckTextStyles}>
            Чтобы сохранить, нажмите кнопку
            <br /> сохранить черновик
        </Text>
        <SaveRecipeDraft variant='commonLoginBtn' values={values} onSaveSuccess={onSaveSuccess} />
        <Button variant='plain' onClick={() => onSaveSuccess?.()}>
            Выйти без сохрания
        </Button>
    </VStack>
);
