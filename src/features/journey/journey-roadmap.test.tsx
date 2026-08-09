import { render, screen } from '@testing-library/react-native';

import { JourneyRoadmap } from './journey-roadmap';

describe('JourneyRoadmap', () => {
  it('announces each milestone with its status', async () => {
    await render(<JourneyRoadmap milestones={[{ complete: false, date: 'March 2027', description: 'Synthetic milestone', icon: 'shield-outline', name: 'Emergency fund', status: '62% complete' }]} />);
    expect(screen.getByLabelText('Emergency fund, 62% complete')).toBeOnTheScreen();
  });
});
