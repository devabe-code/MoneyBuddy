const usdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export function formatCurrency(cents: number): string {
    return usdFormatter.format(cents / 100);
}