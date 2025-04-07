import './style.css';

import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, Grid, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';

import { TagKey } from '~/types/utilsTypes';
import AddNotifications from '~/utils/addNotifications';
import AddRecommendation from '~/utils/addRecommendation';
import AddTags from '~/utils/addTags';

import * as socialIcons from '../../../assets/socialIcons/index';
import juiciestData from './juiciestData';

export default function Juiciest() {
    return (
        <VStack className='juiciest' align='flex-start'>
            <HStack justifyContent='space-between' width='95.5%'>
                <Heading as='h2' size='h2'>
                    Самое cочное
                </Heading>
                <Button size='lg' background='#B1FF2E' rightIcon={<ArrowForwardIcon />}>
                    Вся подборка
                </Button>
            </HStack>
            <Grid className='juiciest__list' gap='24px'>
                {juiciestData.map(
                    ({ imgUrl, title, description, tag, notifications, userRecommendation }) => (
                        <HStack className='juiciest__item'>
                            <VStack
                                height='100%'
                                width='100%'
                                className='juiciest__item__image-container'
                            >
                                <Image src={imgUrl} />
                                <AddRecommendation userRecommendation={userRecommendation} />
                            </VStack>
                            <VStack align='flex-start'>
                                <HStack>
                                    <AddTags tag={tag as TagKey} />
                                    <AddNotifications notifications={notifications} />
                                </HStack>
                                <Heading as='h4' size='h4'>
                                    {title}
                                </Heading>
                                <Text>{description}</Text>
                                <ButtonGroup>
                                    <Button
                                        size='sm'
                                        background='white'
                                        border='1px solid black'
                                        leftIcon={<Image src={socialIcons.shares} />}
                                    >
                                        Сохранить
                                    </Button>
                                    <Button size='sm' background='black' color='white'>
                                        Готовить
                                    </Button>
                                </ButtonGroup>
                            </VStack>
                        </HStack>
                    ),
                )}
            </Grid>
        </VStack>
    );
}
