import { createContext, useContext } from 'react';

import { ModalContextType } from '~/types/context';

export const ModalContext = createContext<ModalContextType | null>(null);
export const useModal = () => {
    const ctx = useContext(ModalContext);
    if (!ctx) throw new Error('useDrawer должен использоваться внутри <ModalProvider>');
    return ctx;
};
