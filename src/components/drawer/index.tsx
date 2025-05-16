import { Drawer as ChakraDrawer, DrawerBody, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

import { DrawerProps } from '~/types/utilsTypes';

export default function Drawer({ isOpen, onClose, element, isFilter = false }: DrawerProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);
    return (
        <ChakraDrawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            size={{ lg: 'md', base: 'sm' }}
        >
            <DrawerOverlay backdropFilter='blur(4px)' bg='blackAlpha.200' />
            <DrawerContent
                ref={contentRef}
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
