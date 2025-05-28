import { Box, Button, Center, Heading, Image, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import emptyImg from '../../assets/emptyImage.png';
import closeImage from '../../assets/verificationCloseImg.svg';
import {
    dropImageModalContentStyles,
    dropImageModalHeader,
    dropImageModalWrapperStyles,
} from './styles';
type DropImageModalProps = {
    isOpen: boolean;
    onClose: () => void;
    initImage: string;
    onSave: (preview: string, file: File) => void;
};
export const DropImageModal = ({ isOpen, onClose, initImage, onSave }: DropImageModalProps) => {
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
    useEffect(() => {
        if (isOpen) {
            setPreview(initImage);
            setFile(null);
        }
    }, [isOpen, initImage]);
    const handleSave = () => {
        if (!file) return;
        onSave(preview, file);
    };
    if (!isOpen) return null;
    return (
        <Center {...dropImageModalWrapperStyles}>
            <VStack {...dropImageModalContentStyles} w={{ lg: '396px', base: '316px' }}>
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
                {preview !== emptyImg && (
                    <Button variant='commonLoginBtn' onClick={handleSave}>
                        Сохранить
                    </Button>
                )}
                <Image
                    position='absolute'
                    right='24px'
                    onClick={onClose}
                    src={closeImage}
                    alt='close modal img'
                />
            </VStack>
        </Center>
    );
};
