import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { colors, radii, spacing } from '@/constants/theme';

type CardProps = {
    children: ReactNode;
};

export function Card({ children }: CardProps) {
    return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        padding: spacing.xl,
        gap: spacing.lg,
        backgroundColor: colors.surface,
        borderRadius: radii.lg,
        borderWidth: 1,
        borderColor: colors.border,
    },
});
