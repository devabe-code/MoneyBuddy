import { MONEYBUDDY_EXPLAINER_STEPS } from './explainer-content';

describe('MoneyBuddy explainer content', () => {
  it('keeps the three product pillars in presentation order', () => {
    expect(MONEYBUDDY_EXPLAINER_STEPS.map((step) => step.title)).toEqual([
      'Map your cashflow',
      'Compare strategies',
      'Follow the journey',
    ]);
  });
});
