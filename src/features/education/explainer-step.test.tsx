import { render, screen } from '@testing-library/react-native';

import { ExplainerStep } from './explainer-step';

describe('ExplainerStep', () => {
  it('renders a numbered, reusable explanation', async () => {
    await render(<ExplainerStep copy="Expected pay becomes a dated plan." icon="calendar-outline" number={1} title="Map cashflow" />);
    expect(screen.getByLabelText('Step 1')).toBeOnTheScreen();
    expect(screen.getByText('Map cashflow')).toBeOnTheScreen();
  });
});
