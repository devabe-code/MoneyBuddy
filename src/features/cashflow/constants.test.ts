import { CASHFLOW_CALENDAR } from './constants';

describe('cashflow constants', () => {
  it('defines a complete five-week calendar preview', () => {
    expect(CASHFLOW_CALENDAR.cellCount).toBe(35);
    expect(CASHFLOW_CALENDAR.weekdayLabels).toHaveLength(7);
    expect(CASHFLOW_CALENDAR.monthLabel).toBe('September 2026');
  });
});
