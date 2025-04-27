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
export const invertedAllergens = Object.fromEntries(
    Object.entries(allergensMap).map(([rus, eng]) => [eng, rus]),
);
