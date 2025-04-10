import './style.css';

import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, Grid, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';

import { TagKey } from '~/types/utilsTypes';
import AddNotifications from '~/utils/addNotifications';
import AddRecommendation from '~/utils/addRecommendation';
import AddTags from '~/utils/addTags';

import * as JuiciestImg from '../../../assets/sections/JuiciestImg/index';
import * as socialIcons from '../../../assets/socialIcons/index';
import DB from '../../../data/db.json';

export default function Juiciest() {
    return (
        <VStack className='juiciest' align='flex-start' gap='10px'>
            <HStack justifyContent='space-between' width='100%'>
                <Heading as='h2' size='h2'>
                    Самое cочное
                </Heading>
                <Button size='lg' background='#B1FF2E' rightIcon={<ArrowForwardIcon />}>
                    Вся подборка
                </Button>
            </HStack>
            <Grid className='juiciest__list' gap='24px'>
                {DB.juiciestData.map(
                    ({ imgUrl, title, description, tag, notifications, userRecommendation }) => (
                        <HStack
                            key={title}
                            className='juiciest__item'
                            width='668px'
                            position='relative'
                        >
                            <VStack
                                height='100%'
                                width='55%'
                                className='juiciest__item__image-container'
                            >
                                <Image src={JuiciestImg[imgUrl as keyof typeof JuiciestImg]} />
                                <AddRecommendation userRecommendation={userRecommendation} />
                            </VStack>
                            <VStack
                                className='juiciest__item-content'
                                align='flex-start'
                                gap='24px'
                            >
                                <HStack justify='space-between' width='100%'>
                                    <AddTags
                                        tag={tag as TagKey}
                                        withText={true}
                                        color='#ffffd3'
                                        size='16px'
                                    />
                                    <AddNotifications notifications={notifications} />
                                </HStack>
                                <VStack align='flex-start' gap='6px' height='100px'>
                                    <Heading noOfLines={1} as='h4' size='h4' mt='-2px'>
                                        {title}
                                    </Heading>
                                    <Text variant='sectionDescription'>{description}</Text>
                                </VStack>
                                <ButtonGroup width='100%' justifyContent='flex-end'>
                                    <Button
                                        height='32px'
                                        width='122px'
                                        background='white'
                                        border='1px solid black'
                                        leftIcon={<Image src={socialIcons.shares} />}
                                    >
                                        Сохранить
                                    </Button>
                                    <Button
                                        height='32px'
                                        width='87px '
                                        background='black'
                                        color='white'
                                    >
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
