import DB from '../../data/db.json';
export default function filterRecipesOnData() {
    const sortedByDate = DB.card.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
    });

    return sortedByDate.slice(0, 10);
}
