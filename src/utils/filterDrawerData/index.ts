import { FilterData } from '~/types/userTypes';

import DB from '../../data/db.json';
import { getFilledFilterData } from '../getFilteredData';
export default function filterDrawerData(data: FilterData) {
    const cards = DB.card;
    const getData = getFilledFilterData(data);
    return cards.filter((card) => {
        if (getData.allergens) {
            if (
                getData.allergens.every(
                    (key) => !Object.prototype.hasOwnProperty.call(card, key),
                ) === false
            ) {
                return false;
            }
        }

        if (getData.auth && getData.auth.length > 0) {
            if (!getData.auth.includes(card.author.name)) {
                return false;
            }
        }
        if (getData.category && getData.category.length > 0) {
            if (!card.category.some((cat) => getData.category?.includes(cat))) {
                return false;
            }
        }

        if (getData.meat) {
            if (!card.category.some((cat) => getData.meat!.includes(cat))) {
                return false;
            }
        }

        if (getData.sideDish) {
            if (!getData.sideDish.includes(card.side)) {
                return false;
            }
        }

        return true;
    });
}
