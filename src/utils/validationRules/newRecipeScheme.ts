import * as Yup from 'yup';
const ingredientArrScheme = Yup.object({
    title: Yup.string().required().max(50),
    count: Yup.number().required().positive(),
    measureUnit: Yup.string().required(),
});
const stepsArrSchema = Yup.object({
    description: Yup.string().required().max(300),
    image: Yup.mixed<File>(),
});
export const newRecipeScheme = Yup.object({
    image: Yup.string().required('Изображение обязательно'),
    title: Yup.string().required('Название обязательно').max(50, 'Максимум 50 символов'),
    description: Yup.string().required('Описание обязательно').max(500, 'Максимум 500 символов'),
    portions: Yup.number()
        .required('Количество порций обязательно')
        .positive('Число должно быть положительным')
        .integer('Число должно быть целым'),
    time: Yup.number()
        .required('Время приготовления обязательно')
        .positive('Число должно быть положительным')
        .integer('Число должно быть целым')
        .max(10000),
    categoriesIds: Yup.array().min(3).required(),
    ingredients: Yup.array()
        .of(ingredientArrScheme)
        .min(1, 'Добавьте хотя бы один ингредиент')
        .required('Ингредиенты обязательны'),
    steps: Yup.array()
        .of(stepsArrSchema)
        .min(1, 'Добавьте хотя бы один шаг')
        .required('Добавьте хотя бы один шаг'),
});
