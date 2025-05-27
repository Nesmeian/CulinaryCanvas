import * as Yup from 'yup';
const ingredientSchema = Yup.object({
    title: Yup.string().required().max(50),
    count: Yup.number().required().positive(),
    measureUnit: Yup.string().required(),
});
export const newRecipeScheme = Yup.object({
    image: Yup.mixed<File>()
        .required('Изображение обязательно')
        .test('is-file', 'Файл не выбран', (value): value is File => value instanceof File),
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
    ingredients: Yup.array()
        .of(ingredientSchema)
        .min(1, 'Добавьте хотя бы один ингредиент')
        .required('Ингредиенты обязательны'),
});
