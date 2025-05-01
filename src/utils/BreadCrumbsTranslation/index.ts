import DB from '../../data/db.json';
export default function translatePathSegment(segment: string) {
    const subcategories = DB.navMenu.categories.reduce(
        (acc, { subCategories }) => {
            subCategories.forEach(({ category, title }) => {
                if (!acc[category]) {
                    acc[category] = title;
                }
            });
            return acc;
        },
        {} as Record<string, string>,
    );
    const categories = DB.navMenu.categories.reduce(
        (acc, { category, title }) => {
            acc[category] = title;
            return acc;
        },
        {} as Record<string, string>,
    );
    const dishes = DB.card.reduce(
        (acc, { id, title }) => {
            acc[id] = title;
            return acc;
        },
        {} as Record<string, string>,
    );
    const juiciest = { 'the-juiciest': 'Самое сочное' } as Record<string, string>;
    const mergedTranslations = { ...subcategories, ...categories, ...dishes, ...juiciest };

    return mergedTranslations[segment] || segment;
}
