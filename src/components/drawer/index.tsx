import { AnimatePresence, motion } from 'framer-motion';
import { JSX } from 'react';

export default function Drawer({ state, element }: { state: boolean; element: JSX.Element }) {
    return (
        <AnimatePresence>
            {state && (
                <motion.div
                    key='menu'
                    style={{
                        width: '320px',
                        height: 'calc(100vh - 160px)',
                        position: 'fixed',
                        right: 0,
                        top: '80px',
                        background: 'white',
                        boxShadow: '-2px 0 15px rgba(0,0,0,0.1)',
                        padding: '20px',
                    }}
                    initial={{ x: '320px' }}
                    animate={{ x: '0' }}
                    exit={{ x: '320px' }}
                    transition={{ duration: 0.5 }}
                    className='menu-overlay'
                >
                    {element}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
