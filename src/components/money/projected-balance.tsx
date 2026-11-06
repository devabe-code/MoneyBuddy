import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/constants/theme';
import { formatCurrency } from '@/utils/currency';

type ProjectedBalanceProps = {
    amountCents: number;
};

export function ProjectedBalance({
    amountCents,
}: ProjectedBalanceProps) {
    const hasShortfall = amountCents < 0;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Projected month-end balance</Text>

            <Text style={[styles.amount, hasShortfall && styles.negative]}>
                {formatCurrency(amountCents)}
            </Text>

            {hasShortfall && (
                <Text style={styles.warning}>
                    Planned spending exceeds your available cash this month.
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: spacing.sm,
    },
    label: {
        ...typography.body,
        color: colors.textSecondary,
    },
    amount: {
        ...typography.amount,
        color: colors.text,
        fontVariant: ['tabular-nums'],
    },
    negative: {
        color: colors.expense,
    },
    warning: {
        ...typography.body,
        color: colors.expense,
    },
});