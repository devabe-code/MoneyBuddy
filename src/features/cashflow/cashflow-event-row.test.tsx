import { render, screen } from '@testing-library/react-native';

import { CashflowEventRow } from './cashflow-event-row';

describe('CashflowEventRow', () => {
  it('combines the label and amount for assistive technology', async () => {
    await render(<CashflowEventRow event={{ amount: '+$2,240', label: 'Synthetic paycheck', positive: true }} />);
    expect(screen.getByLabelText('Synthetic paycheck, +$2,240')).toBeOnTheScreen();
  });

  it('optionally displays calendar context', async () => {
    await render(<CashflowEventRow event={{ amount: '−$118', day: '21', label: 'Sample utility bill', month: 'SEP', positive: false }} showDate />);
    expect(screen.getByText('SEP')).toBeOnTheScreen();
    expect(screen.getByText('21')).toBeOnTheScreen();
  });
});
