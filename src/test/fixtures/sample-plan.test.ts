import { samplePlan } from './sample-plan';

describe('sample plan fixture', () => {
  it('is explicitly marked synthetic and contains each preview area', () => {
    expect(samplePlan.fixtureKind).toBe('synthetic');
    expect(samplePlan.upcoming.length).toBeGreaterThan(0);
    expect(samplePlan.journey.length).toBeGreaterThan(0);
    expect(samplePlan.selectedCalendarDay.events.length).toBeGreaterThan(0);
    expect(samplePlan.calendarDays).toHaveLength(35);
    expect(new Set(samplePlan.calendarDays.map((day) => day.label))).toHaveProperty('size', 35);
    expect(samplePlan.calendarDays.at(-1)?.label).toBe('October 3, 2026');
  });

  it('does not contain common real-user identifiers', () => {
    const serialized = JSON.stringify(samplePlan);
    expect(serialized).not.toMatch(/@|routing|account number|social security/i);
  });
});
