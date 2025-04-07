import './style.css';

import { HStack, Image, Text } from '@chakra-ui/react';
export default function AddRecommendation({ userRecommendation }) {
    return (
        userRecommendation && (
            <HStack className='user-recommendation'>
                <Image src={userRecommendation.imgUrl} alt={`${userRecommendation.user} image`} />
                <Text>{`${userRecommendation.user} рекомендует`}</Text>
            </HStack>
        )
    );
}
