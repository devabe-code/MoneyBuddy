import { AppText, Screen, TextLink } from '@/src/design-system/components';
import { MONEYBUDDY_EXPLAINER_STEPS } from '@/src/features/education/explainer-content';
import { ExplainerStep } from '@/src/features/education/explainer-step';
import { supportRoutes } from '@/src/navigation/routes';

export default function AboutScreen() {
  return (
    <Screen title="A plan you can explain" subtitle="MoneyBuddy connects everyday cashflow to the goals that matter.">
      {MONEYBUDDY_EXPLAINER_STEPS.map((step, index) => <ExplainerStep {...step} key={step.title} number={index + 1} />)}
      <TextLink
        hint="Opens synthetic examples of loading, empty, error, offline, stale, and partial states."
        href={supportRoutes.statePreview}
        label="Preview app states"
      />
      <AppText style={{ paddingHorizontal: 8, textAlign: 'center' }} tone="muted" variant="caption">
        MoneyBuddy is a planning tool. It does not provide financial or tax advice.
      </AppText>
    </Screen>
  );
}
