export type CurrencyCode = 'USD';

export type SavingsGoal = Readonly<{
  currency: CurrencyCode;
  id: string;
  kind: 'custom' | 'emergency-fund' | 'vehicle';
  name: string;
  savedMinor: bigint;
  targetDate?: string;
  targetMinor: bigint;
}>;

export function defineSavingsGoal(input: SavingsGoal): SavingsGoal {
  if (!input.id.trim()) throw new Error('Savings goal id is required.');
  if (!input.name.trim()) throw new Error('Savings goal name is required.');
  if (input.targetMinor <= 0n) throw new Error('Savings goal target must be greater than zero.');
  if (input.savedMinor < 0n) throw new Error('Savings goal saved amount cannot be negative.');
  return Object.freeze({ ...input });
}
