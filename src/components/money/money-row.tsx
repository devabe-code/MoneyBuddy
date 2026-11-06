import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/constants/theme';
import { formatCurrency } from '@/utils/currency';

type MoneyRowProps = {
    label: string;
    amountCents: number;
    kind?: 'neutral' | 'income' | 'expense';
};

const appearance = {
    neutral: { color: colors.text, prefix: '' },
    income: { color: colors.income, prefix: '+' },
    expense: { color: colors.expense, prefix: '-' },
} as const;

export function MoneyRow({
    label,
    amountCents,
    kind = 'neutral',
}: MoneyRowProps) {
    const { color, prefix } = appearance[kind];

    return (
        <View style={styles.row}>
            <Text style={styles.label}>{label}</Text>

            <Text style={[styles.value, { color }]}>
                {prefix}
                {formatCurrency(amountCents)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({ 
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        columnGap: spacing.lg,
        rowGap: spacing.xs,
    },
    label: {
        ...typography.body,
        color: colors.textSecondary,
    },
    value: {
        ...typography.body,
        fontWeight: '600',
        color: colors.text,
        fontVariant: ['tabular-nums'],
    },
});