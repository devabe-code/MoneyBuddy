import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import { coreRoutes, MONEYBUDDY_SCHEME, resolveCoreRoute } from './routes';

describe('core navigation contract', () => {
  it('has the four required destinations with unique routes and route files', () => {
    expect(coreRoutes.map((route) => route.title)).toEqual(['Today', 'Calendar', 'Goals', 'Journey']);
    expect(new Set(coreRoutes.map((route) => route.href)).size).toBe(coreRoutes.length);
    for (const route of coreRoutes) {
      expect(existsSync(path.join(process.cwd(), 'app', '(tabs)', `${route.file}.tsx`))).toBe(true);
    }
  });

  it.each([
    ['moneybuddy://', 'today'],
    ['moneybuddy://calendar', 'calendar'],
    ['moneybuddy://goals?source=test', 'goals'],
    ['https://moneybuddy.example/journey', 'journey'],
  ])('resolves %s to %s', (url, key) => {
    expect(resolveCoreRoute(url)?.key).toBe(key);
  });

  it('rejects unknown destinations', () => {
    expect(resolveCoreRoute('moneybuddy://unknown')).toBeUndefined();
  });

  it('declares the tested custom URL scheme in Expo config', () => {
    const config = JSON.parse(readFileSync(path.join(process.cwd(), 'app.json'), 'utf8'));
    expect(config.expo.scheme).toBe(MONEYBUDDY_SCHEME);
  });
});
