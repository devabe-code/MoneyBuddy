# Common app-state contract

Status: implemented in P0 (`MB-003`)  
Owner: design system  
External API: none

`CommonState` is the single visual and accessibility contract for loading, empty,
error, offline, stale, and partial app states. Feature layers provide user-safe
copy, optional freshness metadata, and an optional recovery action; the design
system owns presentation, touch targets, announcement behavior, and loading
placeholders.

## Component contract

```ts
type CommonStateKind =
  | 'loading'
  | 'empty'
  | 'error'
  | 'offline'
  | 'stale'
  | 'partial';

type CommonStateProps = {
  action?: {
    accessibilityHint?: string;
    disabled?: boolean;
    label: string;
    onPress: () => void;
  };
  kind: CommonStateKind;
  message: string;
  metadata?: string;
  presentation?: 'inline' | 'panel';
  title: string;
};
```

## Required semantics

| Kind | Accessibility behavior | Content requirement |
| --- | --- | --- |
| Loading | `progressbar`, busy, polite live region | Describe work; placeholders contain no fake financial values |
| Empty | summary, polite live region | Explain absence and provide the next useful action when available |
| Error | alert, assertive live region | Use safe copy and provide recovery without exposing adapter details |
| Offline | summary, polite live region | Retain cached content and show freshness when known |
| Stale | summary, polite live region | Show freshness and a refresh or reconnect path |
| Partial | summary, polite live region | Keep usable content visible and identify what is unavailable |

Recovery actions are siblings of the announcement container so screen readers do
not collapse them into a non-operable child. Buttons have a minimum 44-point
height. Icons are decorative and never carry state meaning by themselves.

## Usage boundaries

- Feature code chooses the state and supplies domain-appropriate copy.
- Repository/provider failures must be converted to safe feature errors.
- A ready/success state normally renders content without a state notice.
- Features retain usable cached or partial content beside the notice.
- Fixtures, screenshots, tests, and logs use synthetic data only.
- The gallery at `/state-preview`, linked from About, demonstrates all variants.
