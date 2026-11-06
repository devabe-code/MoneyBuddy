/* All monetary values are integer cents. */
export type MonthlyCashFlow = {
    openingBalanceCents: number;
    incomeCents: number;
    expensesCents: number;
};