import './style.css';

import { HStack, Image, Text } from '@chakra-ui/react';

import * as userRecommendationImg from '../../assets/users/smallImg/index';
import { AddRecommendationProps } from '../../types/utilsTypes';
export default function AddRecommendation({ userRecommendation }: AddRecommendationProps) {
    return (
        userRecommendation && (
            <HStack className='user-recommendation'>
                <Image
                    src={userRecommendationImg[userRecommendation.imgUrl]}
                    alt={`${userRecommendation.user} image`}
                />
                <Text variant='addUserRecommendation'>{`${userRecommendation.user} рекомендует`}</Text>
            </HStack>
        )
    );
}
