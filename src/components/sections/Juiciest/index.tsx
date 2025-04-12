import './style.css';

import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
    Button,
    ButtonGroup,
    Grid,
    Heading,
    HStack,
    Image,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react';

import useBreakpoints from '~/themes/chakraBreakPoints';
import { TagKey } from '~/types/utilsTypes';
import AddNotifications from '~/utils/addNotifications';
import AddRecommendation from '~/utils/addRecommendation';
import AddTags from '~/utils/addTags';

import * as JuiciestImg from '../../../assets/sections/JuiciestImg/index';
import * as socialIcons from '../../../assets/socialIcons/index';
import DB from '../../../data/db.json';

export default function Juiciest() {
    const { isTablet } = useBreakpoints();
    return (
        <VStack className='juiciest' align='flex-start' gap={{ xl: '10px', sm: '10px' }}>
            <HStack justifyContent='space-between' width='100%'>
                <Heading as='h2' size='h2'>
                    Самое cочное
                </Heading>
                {!isTablet && (
                    <Button
                        size={{ xl: 'lg', sm: 'md' }}
                        background='#B1FF2E'
                        className='juiciest__btn-all'
                        rightIcon={<ArrowForwardIcon />}
                    >
                        Вся подборка
                    </Button>
                )}
            </HStack>
            <Grid className='juiciest__list' gap={{ xl: '24px', md: '16px', sm: '11px' }}>
                {DB.juiciestData.map(
                    ({
                        id,
                        imgUrl,
                        title,
                        description,
                        tag,
                        notifications,
                        userRecommendation,
                    }) => (
                        <HStack key={id} className='juiciest__item' position='relative'>
                            <VStack className='juiciest__item__image-container'>
                                <Image
                                    height='100%'
                                    width='100%'
                                    src={JuiciestImg[imgUrl as keyof typeof JuiciestImg]}
                                />
                                {!isTablet && (
                                    <AddRecommendation userRecommendation={userRecommendation} />
                                )}
                            </VStack>
                            <VStack
                                className='juiciest__item-content'
                                align='flex-start'
                                gap='24px'
                                justify='space-between'
                            >
                                <Stack
                                    justify='space-between'
                                    width='100%'
                                    direction={{ lg: 'row', sm: 'column' }}
                                    gap={0}
                                >
                                    <AddTags
                                        tag={tag as TagKey}
                                        withText={true}
                                        color='#ffffd3'
                                        size='16px'
                                    />
                                    <AddNotifications notifications={notifications} />
                                    {isTablet && (
                                        <Heading
                                            noOfLines={2}
                                            variant='sectionContentHeadingStyles'
                                            as='h4'
                                            size='h4'
                                            mt='-2px'
                                        >
                                            {title}
                                        </Heading>
                                    )}
                                </Stack>
                                {!isTablet && (
                                    <VStack
                                        align='flex-start'
                                        gap='6px'
                                        height={{ lg: '100px', sm: 'auto' }}
                                    >
                                        <Heading
                                            noOfLines={1}
                                            variant='sectionHeadingStyles'
                                            as='h4'
                                            size='h4'
                                            mt='-2px'
                                        >
                                            {title}
                                        </Heading>

                                        <Text variant='sectionDescription'>{description}</Text>
                                    </VStack>
                                )}
                                <ButtonGroup width='100%' justifyContent='flex-end' gap='10px'>
                                    <Button
                                        fontSize={{ md: '15px', sm: '12px' }}
                                        className='juiciest__btn-save'
                                        size={{ lg: 'sm', sm: 'xs' }}
                                        border='1px solid black'
                                        backgroundColor='white'
                                        p={{ xl: '8px', lg: '8px', sm: '0' }}
                                        leftIcon={
                                            <Image
                                                boxSize={{ lg: '16px', sm: '12px' }}
                                                src={socialIcons.shares}
                                            />
                                        }
                                        iconSpacing={{ lg: 2, sm: 0 }}
                                    >
                                        {!isTablet && 'Сохранить'}
                                    </Button>
                                    <Button
                                        fontSize={{ md: '15px', sm: '12px' }}
                                        className='juiciest__btn-cook'
                                        size={{ lg: 'sm', sm: 'xs' }}
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
            {isTablet && (
                <Button
                    size={{ xl: 'lg', sm: 'md' }}
                    background='#B1FF2E'
                    className='juiciest__btn-all'
                    rightIcon={<ArrowForwardIcon />}
                    alignSelf='center'
                >
                    Вся подборка
                </Button>
            )}
        </VStack>
    );
}
