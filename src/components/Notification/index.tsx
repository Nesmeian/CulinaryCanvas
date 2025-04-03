import { Heading, HStack, Image, Stack, StackDirection } from '@chakra-ui/react';

import * as socialImgs from '../../assets/socialIcons/index';

type NotificationListProps = {
    direction: 'horizontal' | 'vertical';
};
export default function NotificationList({ direction }: NotificationListProps) {
    const asideData = {
        shares: 185,
        views: 589,
        likes: 587,
    };
    const styles = {
        horizontal: {
            flexDirection: 'column' as StackDirection,
            gap: '40px',
            marginTop: '24px',
        },
        vertical: {
            flexDirection: 'row' as StackDirection,
            gap: '8px',
            marginTop: '0px',
        },
    };
    const currentStyle = styles[direction];
    return (
        <HStack>
            <Stack
                flexDirection={currentStyle.flexDirection}
                gap={currentStyle.gap}
                mt={currentStyle.marginTop}
            >
                {Object.entries(asideData).map(([type, value]) => (
                    <HStack key={type}>
                        <Image src={socialImgs[type]} />
                        <Heading as='p'>{value}</Heading>
                    </HStack>
                ))}
            </Stack>
        </HStack>
    );
}
