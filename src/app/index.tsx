import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Screen } from '../components/screen';
import { colors, spacing, typography } from '../constants/theme';

import { sampleCashFlow } from '@/data/sample-cash-flow';
import { BalanceSummary } from '@/components/balance-summary';

export default function HomeScreen() {
  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to MoneyBuddy</Text>
        <Text style={styles.subtitle}>Your personal finance companion</Text>

        <BalanceSummary
          month="November 2026"
          cashFlow={sampleCashFlow}
        />
      </View>
    </Screen>
    
  )
}

const styles = StyleSheet.create({ 
  header: {
    gap: spacing.sm,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    marginTop: spacing.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  }
})