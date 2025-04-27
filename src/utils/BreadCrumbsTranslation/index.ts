import DB from '../../data/db.json';
export default function translatePathSegment(segment: string) {
    const subcategories = DB.navMenu.categories.reduce(
        (acc, { elems }) => {
            Object.entries(elems).forEach(([key, value]) => {
                if (!acc[value]) {
                    acc[value] = key;
                }
            });
            return acc;
        },
        {} as Record<string, string>,
    );
    const categories = DB.navMenu.categories.reduce(
        (acc, { name, routeName }) => {
            acc[routeName] = name;
            return acc;
        },
        {} as Record<string, string>,
    );
    const dishes = DB.card.reduce(
        (acc, { imgUrl, title }) => {
            acc[imgUrl] = title.length > 15 ? `${title.slice(0, 15)}...` : title;
            return acc;
        },
        {} as Record<string, string>,
    );
    const juiciest = { juiciest: 'Самое сочное' } as Record<string, string>;
    const mergedTranslations = { ...subcategories, ...categories, ...dishes, ...juiciest };

    return mergedTranslations[segment] || segment;
}
