import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

export default function GreenButton({ text, center }: { center?: boolean; text: string }) {
    const alignCenter = center ? 'center' : 'auto';
    return (
        <Button
            p='20px '
            size={{ xl: 'lg', sm: 'md' }}
            alignSelf={alignCenter}
            background='#B1FF2E'
            rightIcon={<ArrowForwardIcon />}
        >
            {text}
        </Button>
    );
}
