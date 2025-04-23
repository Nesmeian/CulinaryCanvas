import { AnimatePresence, motion } from 'framer-motion';
import { JSX } from 'react';

export default function Drawer({
    state,
    element,
    isFilter,
}: {
    state: boolean;
    element: JSX.Element;
    isFilter?: boolean;
}) {
    return (
        <AnimatePresence>
            {state && (
                <motion.div
                    key='menu'
                    style={{
                        zIndex: '20',
                        borderRadius: ' 0 0 12px 12px',
                        position: 'fixed',
                        right: isFilter ? '0' : '12px',
                        top: isFilter ? '0px' : '80px',
                        background: 'white',
                        boxShadow: '-2px 0 15px rgba(0,0,0,0.1)',
                    }}
                    initial={{ x: '100%' }}
                    animate={{ x: '0' }}
                    exit={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                    className='menu-overlay'
                >
                    {element}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
