import { HStack, Image, Stack, StackDirection, Text } from '@chakra-ui/react';

import * as socialImgs from '../../assets/socialIcons/index';
type SocialType = keyof typeof socialImgs;
type NotificationListProps = {
    direction: 'horizontal' | 'vertical';
};
export default function NotificationList({ direction }: NotificationListProps) {
    const sidebarData = {
        shares: 185,
        views: 589,
        likes: 587,
    };
    const styles = {
        horizontal: {
            flexDirection: 'row' as StackDirection,
            gap: '12px',
            marginTop: '0px',
        },
        vertical: {
            flexDirection: 'column' as StackDirection,
            gap: '40px',
            marginTop: '24px',
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
                {Object.entries(sidebarData).map(([type, value]) => (
                    <HStack key={type} paddingLeft='5px'>
                        <Image
                            boxSize={{
                                sm: '12px',
                                lg: '16px',
                            }}
                            src={socialImgs[type as SocialType]}
                        />
                        <Text variant='notificationTextStyles'>{value}</Text>
                    </HStack>
                ))}
            </Stack>
        </HStack>
    );
}
