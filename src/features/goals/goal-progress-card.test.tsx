import { render, screen } from '@testing-library/react-native';

import { GoalProgressCard, type GoalProgress } from './goal-progress-card';

const goal: GoalProgress = {
  date: 'March 2027', icon: 'shield-outline', name: 'Synthetic emergency fund',
  progress: 62, remaining: '$4,560', saved: '$7,440', target: '$12,000 target',
};

describe('GoalProgressCard', () => {
  it('reuses the goal summary and exposes accessible progress', async () => {
    await render(<GoalProgressCard goal={goal} />);
    expect(screen.getByText('Synthetic emergency fund')).toBeOnTheScreen();
    expect(screen.getByRole('progressbar')).toHaveAccessibilityValue({ now: 62 });
    expect(screen.getByText(/March 2027/)).toBeOnTheScreen();
  });

  it('hides the outlook in compact summaries', async () => {
    await render(<GoalProgressCard compact goal={goal} />);
    expect(screen.queryByText(/March 2027/)).not.toBeOnTheScreen();
  });
});
