import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>MoneyBuddy</Text>
      <Text style={styles.subtitle}>Your personal finance companion.</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#172B21',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#66736B'
  }
})