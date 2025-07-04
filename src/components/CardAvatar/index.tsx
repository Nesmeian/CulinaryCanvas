import { Avatar, Stack, Text } from '@chakra-ui/react';

import { UserProps } from '../../types/userTypes';

export default function CardAvatar({ userData, isLogo }: UserProps) {
    const { img, user, email } = userData;
    const direction = isLogo ? 'column' : 'row';
    const size = isLogo ? '100%' : 'auto';
    const imgSource = ' https://training-api.clevertec.ru';
    return (
        <Stack
            width={size}
            height={size}
            gap={{ lg: '12px', sm: '8px' }}
            justify='center'
            align='center'
            direction={direction}
        >
            <Avatar name={user} src={`${imgSource}/${img}`} boxSize={{ lg: '48px', sm: '40px' }} />
            {!isLogo ? (
                <Stack gap='0'>
                    <Text noOfLines={1} variant='avatarFullName'>
                        {user}
                    </Text>
                    <Text
                        variant='avatarEmail'
                        fontSize={{ lg: '14px', sm: '12px' }}
                        color='rgba(0, 0, 0, 0.64);'
                    >
                        {`@${email}`}
                    </Text>
                </Stack>
            ) : (
                <Text fontWeight='400' fontSize='12px'>
                    Мой профиль
                </Text>
            )}
        </Stack>
    );
}
