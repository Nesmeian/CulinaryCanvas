import { Box, Button, Center, Heading, Image, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { dropImageModalHeader, dropImageModalWrapperStyles } from './styles';

export const DropImageModal = ({
    isOpen,
    onClose,
    initImage,
    setRecipeImage,
    setFormImage,
}: {
    isOpen: boolean;
    onClose: () => void;
    initImage: string;
    setRecipeImage: React.Dispatch<React.SetStateAction<string>>;
    setFormImage: (file: File) => void;
}) => {
    const [preview, setPreview] = useState<string>(initImage);
    const [file, setFile] = useState<File | null>(null);
    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] },
        multiple: false,
        onDrop: ([file]) => {
            setPreview(URL.createObjectURL(file));
            setFile(file);
        },
    });
    const saveImageHandler = () => {
        if (file) {
            setFormImage(file);
            setRecipeImage(preview);
            onClose();
        }
    };
    if (!isOpen) return null;

    return (
        <Center {...dropImageModalWrapperStyles}>
            <VStack bg='white' p='32px' spacing='16px' textAlign='center'>
                <Heading {...dropImageModalHeader}>Изображение</Heading>
                <Box
                    {...getRootProps()}
                    border='2px dashed'
                    borderRadius='md'
                    cursor='pointer'
                    _hover={{ opacity: 0.8 }}
                >
                    <input {...getInputProps()} />

                    <Image
                        src={preview}
                        alt='drop-zone preview'
                        boxSize='206px'
                        objectFit='contain'
                    />
                </Box>

                {preview !== initImage && (
                    <Button variant='commonLoginBtn' onClick={saveImageHandler}>
                        Сохранить
                    </Button>
                )}
            </VStack>
        </Center>
    );
};
