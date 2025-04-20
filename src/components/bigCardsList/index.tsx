import './style.css';

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
import { Link } from 'react-router';

import * as juiciestImg from '../../assets/sections/JuiciestImg/index';
import * as veganImg from '../../assets/sections/veganImg/index';
import * as socialIcons from '../../assets/socialIcons/index';
import useBreakpoints from '../../themes/chakraBreakPoints';
import { BigCardsListProps } from '../../types/dataTypes';
import { TagKey } from '../../types/utilsTypes';
import AddNotifications from '../../utils/addNotifications';
import AddRecommendation from '../../utils/addRecommendation';
import AddTags from '../../utils/addTags/index';
const imgObj = {
    'Веганская кухня': veganImg,
    'Самое сочное': juiciestImg,
};
export default function BigCardsList({ data, maxElems }: BigCardsListProps) {
    const dataCards = data.elems.card;
    const dataTitle = data.title;
    const { isTablet } = useBreakpoints();
    const displayedData = maxElems ? dataCards?.slice(0, maxElems) : dataCards;
    const imgData = imgObj[dataTitle as keyof typeof imgObj];
    return (
        <Grid className='card__list' gap={{ xl: '24px', md: '16px', sm: '11px' }}>
            {displayedData!.map(
                ({
                    id,
                    imgUrl,
                    title,
                    description,
                    tag,
                    notifications,
                    userRecommendation,
                    path,
                }) => (
                    <HStack
                        key={id}
                        className='card__item'
                        position='relative'
                        _hover={{
                            boxShadow:
                                '0 2px 4px -1px rgba(32, 126, 0, 0.06), 0 4px 6px -1px rgba(32, 126, 0, 0.1)',
                        }}
                    >
                        <VStack className='card__item__image-container'>
                            <Image
                                height='100%'
                                width='100%'
                                src={imgData[imgUrl as keyof typeof imgData]}
                            />
                            {!isTablet && (
                                <AddRecommendation userRecommendation={userRecommendation} />
                            )}
                        </VStack>
                        <VStack
                            className='card__item-content'
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
                                    tag={tag as TagKey[]}
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
                                    className='card__btn-save'
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
                                    as={Link}
                                    to={path}
                                    fontSize={{ md: '15px', sm: '12px' }}
                                    className='card__btn-cook'
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
    );
}
