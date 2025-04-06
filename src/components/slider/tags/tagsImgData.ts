import * as imgTags from '../../../assets/navMenuIcons/index';

const tagsKeys = {
    Салаты: imgTags.salads,
    Закуски: imgTags.snacks,
    'Первые блюда': imgTags.firstCourses,
    'Вторые блюда': imgTags.secondCourses,
    'Десерты, выпечка': imgTags.dessertsPastries,
    'Блюда на гриле': imgTags.grilledDishes,
    'Веганская кухня': imgTags.veganCuisine,
    'Детские блюда': imgTags.childrenMeals,
    'Лечебное питание': imgTags.therapeuticNutrition,
    Национальные: imgTags.nationalNutrition,
    Напитки: imgTags.drinks,
    Заготовки: imgTags.foodPreparation,
} as const;

export default tagsKeys;
