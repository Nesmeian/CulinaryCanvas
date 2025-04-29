import * as imgTags from '../../assets/navMenuIcons/index';

const tagsKeys = {
    salads: imgTags.salads,
    snacks: imgTags.snacks,
    firstCourses: imgTags.firstCourses,
    'second-dish': imgTags.mainCourses,
    desserts: imgTags.dessertsPastries,
    grilledDishes: imgTags.grilledDishes,
    vegan: imgTags.veganCuisine,
    kidsDishes: imgTags.childrenMeals,
    therapeuticNutrition: imgTags.therapeuticNutrition,
    national: imgTags.nationalNutrition,
    drinks: imgTags.drinks,
    preserves: imgTags.foodPreparation,
    sauces: imgTags.sauces,
} as const;

export default tagsKeys;
