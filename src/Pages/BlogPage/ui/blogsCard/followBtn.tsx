import { Button, Image } from '@chakra-ui/react';

import * as SocialIcons from '../../../../assets/socialIcons/index';
import { useToggleSubscription } from '../../hooks/useToggleSubscription';

export const FollowBtn = ({
    isFavorite,
    userId,
    setIsToggleLoading,
}: {
    isFavorite: boolean;
    userId: string;
    setIsToggleLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { handleToggle } = useToggleSubscription(userId, setIsToggleLoading);
    return (
        <Button
            p='8px'
            h='24px'
            onClick={handleToggle}
            border='1px solid rgba(0, 0, 0, 0.48)'
            color={isFavorite ? 'black' : 'white'}
            background={isFavorite ? 'white' : 'black'}
            leftIcon={
                <Image src={isFavorite ? SocialIcons.followingIcon : SocialIcons.followIcon} />
            }
        >
            {isFavorite ? 'Вы подписаны' : 'Подписаться'}
        </Button>
    );
};
