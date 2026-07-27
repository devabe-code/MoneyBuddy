import type { Money } from './types';

export function money(minorUnits: number): Money {
  if (!Number.isSafeInteger(minorUnits)) {
    throw new RangeError('Money must be a safe integer in minor units.');
  }

  return minorUnits as Money;
}

export function addMoney(...amounts: Money[]): Money {
  return money(amounts.reduce((total, amount) => total + amount, 0));
}

export function formatMoney(
  amount: Money | number,
  currency = 'USD',
  locale = 'en-US',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount / 100);
}
