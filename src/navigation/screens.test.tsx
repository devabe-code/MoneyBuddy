import { render, screen } from '@testing-library/react-native';

import CalendarScreen from '@/app/(tabs)/calendar';
import GoalsScreen from '@/app/(tabs)/goals';
import TodayScreen from '@/app/(tabs)/index';
import JourneyScreen from '@/app/(tabs)/journey';
import NotFoundScreen from '@/app/+not-found';
import AboutScreen from '@/app/about';

describe('route composition', () => {
  it.each([
    ['Today', TodayScreen, 'Good morning'],
    ['Calendar', CalendarScreen, 'Calendar'],
    ['Goals', GoalsScreen, 'Goals'],
    ['Journey', JourneyScreen, 'Journey'],
    ['About', AboutScreen, 'A plan you can explain'],
    ['Not found', NotFoundScreen, 'That page is not in the plan'],
  ])('renders the %s route from reusable pieces', async (_name, Route, heading) => {
    await render(<Route />);
    expect(screen.getByRole('header', { name: heading })).toBeOnTheScreen();
  });
});
