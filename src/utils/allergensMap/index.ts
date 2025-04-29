export const allergensMap: Record<string, string> = {
    'Молочные продукты': 'Dairy products',
    Яйцо: 'Egg',
    Рыба: 'Fish',
    Моллюски: 'Shellfish',
    Орехи: 'Nuts',
    'Томат (помидор)': 'Tomato',
    Цитрусовые: 'Citrus',
    'Клубника (ягоды)': 'Strawberry (berries)',
    Шоколад: 'Chocolate',
};

export const otherTags: Record<string, string> = {
    Курица: 'Chicken',
    Свинина: 'Pork',
    Говядина: 'Beef',
    Индейка: 'Turkey',
    Утка: 'Duck',
    Картошка: 'Potato',
    Гречка: 'Buckwheat',
    Паста: 'Pasta',
    Спагетти: 'Spaghetti',
    Рис: 'Rice',
    Капуста: 'Cabbage',
    Фасоль: 'Beans',
    'Другие овощи': 'Other vegetables',
};

export const tagsMap: Record<string, string> = {
    ...allergensMap,
    ...otherTags,
};

export const invertedAllergens = Object.fromEntries(
    Object.entries(tagsMap).map(([rus, eng]) => [eng, rus]),
);
