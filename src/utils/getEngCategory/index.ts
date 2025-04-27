import DB from '../../data/db.json';
export default function getEngCategory(category: string) {
    const categoriesMap: Record<string, string> = DB.navMenu.categories.reduce(
        (acc, { name, routeName }) => {
            acc[name] = routeName;
            return acc;
        },
        {} as Record<string, string>,
    );

    return categoriesMap[category];
}
