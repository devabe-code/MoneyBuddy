import type { MonthlyCashFlow } from '@/types/money';

export function getProjectedBalance({
    openingBalanceCents,
    incomeCents,
    expensesCents,
}: MonthlyCashFlow): number {
    return openingBalanceCents + incomeCents - expensesCents;
}