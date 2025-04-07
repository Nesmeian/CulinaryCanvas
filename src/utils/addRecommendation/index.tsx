import './style.css';

import { HStack, Image, Text } from '@chakra-ui/react';

import { AddRecommendationProps } from '~/types/utilsTypes';
export default function AddRecommendation({ userRecommendation }: AddRecommendationProps) {
    return (
        userRecommendation && (
            <HStack className='user-recommendation'>
                <Image src={userRecommendation.imgUrl} alt={`${userRecommendation.user} image`} />
                <Text variant='addUserRecommendation'>{`${userRecommendation.user} рекомендует`}</Text>
            </HStack>
        )
    );
}
