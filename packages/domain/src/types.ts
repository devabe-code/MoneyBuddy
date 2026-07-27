/**
 * Currency amount in the smallest unit (for USD, cents).
 *
 * The branded type prevents an unlabelled number from accidentally entering a
 * financial calculation. Persist currency and scale alongside this value.
 */
export type Money = number & { readonly __brand: 'Money' };

export type IsoDate = `${number}-${number}-${number}`;

export type PayFrequency = 'weekly' | 'biweekly' | 'semimonthly' | 'monthly';

export interface SavingsGoal {
  id: string;
  name: string;
  target: Money;
  currentBalance: Money;
  targetDate?: IsoDate;
}

export interface SavingsStrategy {
  id: string;
  name: string;
  contributionPerPaycheck: Money;
}

export interface ProjectionPoint {
  paycheckNumber: number;
  balance: Money;
}

export interface SavingsProjection {
  goalId: string;
  strategyId: string;
  points: ProjectionPoint[];
  paychecksToGoal: number | null;
}
