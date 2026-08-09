import { render, screen } from '@testing-library/react-native';

import { CalendarGrid } from './calendar-grid';
import { CASHFLOW_CALENDAR } from './constants';

describe('CalendarGrid', () => {
  it('keeps the reusable seven-day heading contract', () => {
    expect(CASHFLOW_CALENDAR.weekdayLabels).toHaveLength(7);
  });

  it('announces dates and events without relying on visual dots', async () => {
    await render(<CalendarGrid monthLabel="September 2026" days={[{ event: 'Synthetic paycheck', label: 'September 18, 2026', muted: false, number: 18, positive: true, today: true }]} />);
    expect(screen.getByLabelText('September 18, 2026, Synthetic paycheck')).toBeOnTheScreen();
  });
});
