export default function hasActiveFilters(filterData: Record<string, string[]>): boolean {
    console.log(
        Object.values(filterData).some((value) =>
            Array.isArray(value) ? value.length > 0 : value !== '',
        ),
    );
    return Object.values(filterData).some((value) =>
        Array.isArray(value) ? value.length > 0 : value !== '',
    );
}
