import { StyleSheet, Text, View } from 'react-native';

import { MoneyRow } from '@/components/money/money-row';
import { ProjectedBalance } from '@/components/money/projected-balance';
import { Card } from '@/components/ui/card';
import { colors, typography } from '@/constants/theme';
import type { MonthlyCashFlow } from '@/types/money';
import { getProjectedBalance } from '@/utils/cash-flow';

type BalanceSummaryProps = {
    month: string;
    cashFlow: MonthlyCashFlow;
};

export function BalanceSummary({
    month,
    cashFlow,
}: BalanceSummaryProps) {
    return (
        <Card>
            <Text style={styles.month}>{month}</Text>

            <ProjectedBalance amountCents={getProjectedBalance(cashFlow)} />

            <View style={styles.divider} />

            <MoneyRow
                label="Opening balance"
                amountCents={cashFlow.openingBalanceCents}
            />
            <MoneyRow
                label="Expected income"
                amountCents={cashFlow.incomeCents}
                kind="income"
            />
            <MoneyRow
                label="Expected spending"
                amountCents={cashFlow.expensesCents}
                kind="expense"
            />

            <Text style={styles.note}>
                Estimate based on your plan, not a live bank balance.
            </Text>
        </Card>
    )
};

const styles = StyleSheet.create({
    month: {
        ...typography.heading,
        color: colors.text,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
    },
    note: {
        ...typography.caption,
        color: colors.textSecondary,
    },
});