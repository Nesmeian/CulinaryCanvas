export function declOfNum(count: number): string {
    const rem10 = count % 10;
    const rem100 = count % 100;

    const adjective = rem10 === 1 && rem100 !== 11 ? 'новый' : 'новых';
    let noun: string;
    if (rem10 === 1 && rem100 !== 11) {
        noun = 'рецепт';
    } else if (rem10 >= 2 && rem10 <= 4 && (rem100 < 12 || rem100 > 14)) {
        noun = 'рецепта';
    } else {
        noun = 'рецептов';
    }

    return `${count} ${adjective} ${noun}`;
}
