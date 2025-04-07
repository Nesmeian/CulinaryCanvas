import * as JuiciestImg from '../../../../assets/sections/JuiciestImg/index';
import * as userRecommendationImg from '../../../../assets/sections/JuiciestImg/userRecommendation/index';
const juiciestData = [
    {
        imgUrl: JuiciestImg.spaghettiDumplings,
        title: 'Кнели со спагетти',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку. ',
        tag: 'Вторые блюда',
        notifications: {
            share: '85',
            likes: '152',
        },
    },
    {
        imgUrl: JuiciestImg.SpicyItalianHam,
        title: 'Пряная ветчина по итальянски  ',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        tag: 'Вторые блюда',
        notifications: {
            share: '257',
            likes: '159',
        },
        userRecommendation: {
            imgUrl: userRecommendationImg.ElenaVysotskaya,
            user: 'Елена Высоцкая',
        },
    },
    {
        imgUrl: JuiciestImg.NoodlesWithChickenAndSaffron,
        title: 'Лапша с курицей и шафраном"',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        tag: 'Вторые блюда',
        notifications: {
            share: '258',
            likes: '342',
        },
        userRecommendation: {
            user: 'Alex Cook',
            imgUrl: userRecommendationImg.AlexCookImg,
        },
    },
    {
        imgUrl: JuiciestImg.TomYamWithKimchiCabbage,
        title: 'Том-ям с капустой кимчи',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        tag: 'Национальные',
        notifications: {
            share: '124',
            likes: '324',
        },
    },
];
export default juiciestData;
