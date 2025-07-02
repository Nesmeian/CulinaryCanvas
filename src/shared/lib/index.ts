export function formatDateRU(isoString: string): string {
    const date = new Date(isoString);

    const datePart = new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
    }).format(date);

    const timePart = date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return `${datePart} ${timePart}`;
}
