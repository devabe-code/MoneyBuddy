import type { ReactNode } from "react";
import {
    ScrollView,
    StyleSheet,
    type StyleProp,
    type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, spacing } from "../constants/theme";

type ScreenProps = {
    children: ReactNode;
    contentStyle?: StyleProp<ViewStyle>;
}

export function Screen({ children, contentStyle }: ScreenProps) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={[styles.content, contentStyle]}
                contentInsetAdjustmentBehavior="never"
                keyboardShouldPersistTaps="handled"
                >
                {children}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scroll: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        width: '100%',
        maxWidth: 720,
        alignSelf: 'center',
        padding: spacing.xl,
        gap: spacing.xl,
    },
});