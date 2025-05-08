import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

export default function GreenButton({
    text,
    center,
    onClick,
    test,
}: {
    test?: string;
    center?: boolean;
    text: string;
    onClick?: () => void;
}) {
    const alignCenter = center ? 'center' : 'auto';
    return (
        <Button
            data-test-id={test ? test : ''}
            p='20px '
            size={{ xl: 'lg', sm: 'md' }}
            alignSelf={alignCenter}
            background='#B1FF2E'
            onClick={onClick}
            rightIcon={<ArrowForwardIcon />}
        >
            {text}
        </Button>
    );
}
