import { Drawer as ChakraDrawer, DrawerBody, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import { JSX } from 'react';

type DrawerProps = {
    isOpen: boolean;
    onClose: () => void;
    element: JSX.Element;
    isFilter?: boolean;
};

export default function Drawer({ isOpen, onClose, element, isFilter = false }: DrawerProps) {
    return (
        <ChakraDrawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            closeOnOverlayClick
            size={{ lg: 'md', base: 'sm' }}
        >
            <DrawerOverlay backdropFilter='blur(4px)' bg='blackAlpha.200' />
            <DrawerContent
                borderRadius='12px'
                mt={isFilter ? 0 : '60px'}
                mb={isFilter ? 0 : '80px'}
                mr='8px'
                boxShadow='-2px 0 15px rgba(0,0,0,0.1)'
                bg='white'
            >
                <DrawerBody p={0}>{element}</DrawerBody>
            </DrawerContent>
        </ChakraDrawer>
    );
}
