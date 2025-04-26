export default function filterOnSubCategories(Data, subcategory) {
    return Data.filter((item) => item.subcategory.includes(subcategory));
}
