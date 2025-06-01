import {
    Button,
    FormControl,
    Heading,
    HStack,
    Image,
    Textarea,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { DropImageModal } from '~/components/dropImageModal';
import { stepTextStyle } from '~/components/recipe/recipeStyles';
import { RecipeFields, UploadedFile } from '~/types/NewRecipesTypes';

import * as AddIcons from '../../../assets/addIcon/index';
import deleteIcon from '../../../assets/deleteIcon.svg';
import emptyImg from '../../../assets/emptyImage.png';

export const StepsList = () => {
    const {
        control,
        formState: { errors },
        setValue,
    } = useFormContext<RecipeFields>();
    const { fields, append, remove } = useFieldArray({
        name: 'steps',
        control,
    });

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const imageOnChangeMap = useRef<Record<number, (val: string) => void>>({});
    const watchedSteps = useWatch({ control, name: 'steps' });
    const openForStep = (idx: number) => {
        setActiveIndex(idx);
        onOpen();
    };

    const handleDelete = (index: number) => {
        remove(index);

        setActiveIndex((prev) => {
            if (prev === index) return null;
            if (prev !== null && prev > index) return prev - 1;
            return prev;
        });
    };
    const saveImageHandler = (uploaded: UploadedFile) => {
        if (activeIndex == null) return;

        const API_BASE = 'https://training-api.clevertec.ru';
        const fullUrl = uploaded.url.startsWith('http')
            ? uploaded.url
            : `${API_BASE}${uploaded.url}`;

        imageOnChangeMap.current[activeIndex]?.(fullUrl);
        console.log(fullUrl);
        setValue(`steps.${activeIndex}.image`, fullUrl, {
            shouldDirty: true,
            shouldValidate: true,
        });

        onClose();
    };
    return (
        <VStack w='100%' spacing='16px'>
            {fields.map((field, i) => (
                <HStack
                    key={field.id}
                    height='160px'
                    w='100%'
                    gap='0'
                    borderRadius='8px'
                    border='1px solid rgba(0, 0, 0, 0.08)'
                    overflowY='scroll'
                >
                    <Controller
                        name={`steps.${i}.image`}
                        control={control}
                        defaultValue={field.image}
                        render={({ field: { value, onChange } }) => {
                            imageOnChangeMap.current[i] = onChange;
                            return (
                                <Image
                                    src={value || emptyImg}
                                    alt={`Шаг ${i}`}
                                    height='100%'
                                    width={{ base: '328px', md: '346px' }}
                                    objectFit='cover'
                                    borderRadius='8px'
                                    cursor='pointer'
                                    onClick={() => openForStep(i)}
                                />
                            );
                        }}
                    />
                    <VStack alignItems='flex-start' p='20px' w={{ base: '322px' }} spacing='8px'>
                        <HStack justifyContent='space-between' w='100%'>
                            <Heading {...stepTextStyle}>Шаг {i + 1}</Heading>
                            {fields.length > 1 && (
                                <Image
                                    src={deleteIcon}
                                    alt='delete icon'
                                    cursor='pointer'
                                    onClick={() => handleDelete(i)}
                                />
                            )}
                        </HStack>

                        <FormControl isInvalid={!!errors.steps?.[i]?.description}>
                            <Controller
                                name={`steps.${i}.description`}
                                control={control}
                                defaultValue={field.description}
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        placeholder='Описание шага'
                                        resize='none'
                                    />
                                )}
                            />
                        </FormControl>
                    </VStack>
                </HStack>
            ))}

            <Button
                alignSelf='flex-end'
                variant='plain'
                rightIcon={<Image src={AddIcons.WhiteCenter} alt='add icon' boxSize='14px' />}
                border='1px solid rgba(0, 0, 0, 0.48)'
                onClick={() =>
                    append({
                        description: '',
                        image: '',
                    })
                }
            >
                Новый шаг
            </Button>

            <DropImageModal
                isOpen={isOpen}
                onClose={onClose}
                initImage={
                    activeIndex != null ? watchedSteps?.[activeIndex]?.image || emptyImg : emptyImg
                }
                onSave={saveImageHandler}
            />
        </VStack>
    );
};
