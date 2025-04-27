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

        if (getData.auth) {
            if (card.author.name !== getData.auth) {
                return false;
            }
        }

        if (getData.category) {
            if (!card.category.includes(getData.category)) {
                return false;
            }
        }

        if (getData.meat) {
            if (!card.category.some((cat) => getData.meat!.includes(cat))) {
                return false;
            }
        }

        if (getData.sideDish) {
            if (!card.subcategory.some((sub) => getData.sideDish!.includes(sub))) {
                return false;
            }
        }

        return true;
    });
}
