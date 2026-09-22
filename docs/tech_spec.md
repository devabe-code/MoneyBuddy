# MoneyBuddy Technical Specification

## Purpose

This specification defines the intended technology stack, delivery phases, system
contracts, and engineering quality bar for MoneyBuddy. Phase labels describe
delivery order: P0 is foundational and P5 is release/web readiness.

## Baseline

The current codebase is an Expo SDK 54 starter using React Native 0.81, React 19,
TypeScript, Expo Router, and the React Native New Architecture. It runs in Expo Go.
All additional dependencies should be introduced only in the phase that needs them.

## Intended technology stack

| Area | Intended choice | Rationale / constraint |
| --- | --- | --- |
| Mobile | Expo SDK 54 + React Native + TypeScript | Current stable physical-device workflow |
| Navigation | Expo Router | File-based native and web routing |
| Forms | React Hook Form + Zod | Typed validation and accessible error handling |
| Server state | TanStack Query | Caching, retries, invalidation, offline-aware reads |
| Client state | Zustand | Small scenario/onboarding stores only |
| Dates | date-fns with explicit IANA time zones | Testable calendar arithmetic |
| Money | Integer minor units behind domain helpers | Avoid binary floating-point persistence |
| Charts | Adapter selected after P1 spike | Must meet accessibility, performance, and web needs |
| API | NestJS + TypeScript + REST/OpenAPI | Modular boundaries and generated contracts |
| Validation | Zod or generated OpenAPI schemas at boundaries | Reject invalid financial inputs early |
| Database | PostgreSQL | Transactions, constraints, JSON snapshots, maturity |
| ORM | Prisma, pending P0 ADR | Migrations and typed queries; confirm in spike |
| Authentication | Supabase Auth or Clerk, pending P0 ADR | Managed mobile auth and server-verifiable tokens |
| Jobs | Managed queue selected in P4 | Required for reliable Plaid synchronization |
| Bank data | Plaid Link + Transactions Sync | Read-only connection and incremental updates |
| Local storage | SecureStore for secrets; SQLite/AsyncStorage only by policy | Separate sensitive and ordinary cached data |
| Mobile builds | EAS Build / Submit | Preview and store distribution |
| CI | GitHub Actions | Lint, formatting, types, tests, migrations, contracts |
| Observability | Sentry first; server metrics/log platform as load requires | Errors, traces, and redacted diagnostics |
| Unit/integration tests | Jest or Vitest; React Native Testing Library | Pure domain and component behavior |
| End-to-end tests | Maestro initially; reassess Detox when native depth grows | Critical journeys with lower setup cost |

## Cross-cutting engineering contracts

### Currency

```ts
type Money = {
  minor: bigint;
  currency: 'USD';
};
```

Transport APIs serialize `minor` as a base-10 string because JSON has no `bigint`.
The client formats values only at the presentation boundary.

### Dates

- `LocalDate`: ISO `YYYY-MM-DD`, no implicit time zone conversion.
- `Instant`: ISO 8601 UTC timestamp.
- `TimeZone`: IANA identifier such as `America/New_York`.
- Recurrence expansion uses the profile time zone and is tested across daylight
  saving transitions, leap years, and month-end dates.

### Forecast reproducibility

Every saved projection includes:

- source input snapshot;
- engine version;
- tax/rule data versions;
- generated timestamp;
- output events and balances;
- warnings and incomplete assumptions.

### API behavior

- Version routes under `/v1`.
- Use idempotency keys for create operations that may be retried.
- Return machine-readable error codes plus safe user-facing messages.
- Paginate transaction and journal collections.
- Use optimistic concurrency or record versions for plan edits.
- Generate and verify OpenAPI contracts in CI.

## P0 — Foundation and decisions

### Objective

Turn the stock Expo starter into a testable MoneyBuddy shell with stable technical
boundaries and documented provider choices.

### Deliverables

- Replace starter screens with Dashboard, Calendar, Goals, and Journey routes.
- Establish design tokens, accessible primitives, loading/error/empty states, and
  light/dark behavior.
- Create `src/domain`, `src/features`, `src/services`, and test fixture boundaries.
- Implement branded money/date types and deterministic domain test harness.
- Add sample local plan data and a replaceable repository interface.
- Decide auth provider, PostgreSQL host, ORM, and repository layout through ADRs.
- Add formatting, linting, TypeScript, unit tests, and Expo Doctor to CI.
- Configure EAS development and preview profiles.
- Define telemetry event names and a redaction policy before adding analytics.

### Exit criteria

- The app launches through Expo Go on supported physical devices.
- Navigation and all common UI states are keyboard/screen-reader reviewable.
- CI blocks type, lint, formatting, and domain-test regressions.
- No production provider is required to demonstrate the shell with synthetic data.
- Open architecture decisions needed by P1 are resolved.

## P1 — Manual cashflow and calendar

### Objective

Let a user describe income and recurring outflows, then understand a 12-month
running-balance projection.

### Deliverables

- Financial profile: currency, locale, time zone, jurisdiction, and tax assumptions.
- Income rules: gross amount, salary/hourly mode, frequency, and next payday.
- Expense and transfer recurrence rules with start/end dates.
- Narrow, versioned gross-to-net estimator with visible assumptions.
- Deterministic recurrence engine and daily balance projection.
- Month calendar, agenda list, day details, and paycheck breakdown.
- Local draft persistence, validation, and recovery from incomplete onboarding.
- Chart-library spike with an accessibility and web-readiness decision.
- Unit/property tests for recurrence, ordering, rounding, and boundary dates.

### Exit criteria

- A user can reproduce every displayed daily balance from visible events.
- The same inputs and engine version return identical projections.
- Unsupported tax cases are labeled incomplete or shown as ranges.
- A 12-month projection meets agreed performance targets on a baseline device.

## P2 — Savings goals and strategies

### Objective

Let users create goals and compare realistic savings strategies without changing
their active plan until they explicitly apply one.

### Deliverables

- Goal create, read, update, archive, reorder, and completion workflows.
- Fixed-dollar and percentage-per-paycheck allocation strategies.
- Conservative, baseline, and focused scenario comparison.
- Savings table with balances by paycheck/month/date.
- Completion-date forecasts and unreachable-goal explanations.
- Priority and allocation conflict handling across multiple goals.
- Immutable scenario snapshots and explicit “Apply strategy” action.
- Accessible progress and comparison visualizations.

### Exit criteria

- Scenario edits never mutate the baseline plan implicitly.
- Goal dates and tables reconcile with the same domain projection output.
- Zero/negative surplus, missed paychecks, and already-funded goals have tested UX.

## P3 — Milestone journey and accounts

### Objective

Persist a user's plan and provide a durable history of progress, decisions, and
connected goals across devices.

### Deliverables

- Authentication, session renewal, sign-out, account recovery, and deletion.
- NestJS API, PostgreSQL schema, migrations, and typed client contracts.
- Cloud persistence for profiles, rules, goals, strategies, and snapshots.
- Milestone templates plus custom milestones.
- Journal entries, notes, attachments policy, and progress check-ins.
- Journey map showing completed, active, paused, and future goals.
- Change explanations comparing projection snapshots.
- Offline reads, queued safe drafts, and conflict UX.

### Exit criteria

- User data is isolated by authorization tests at every API boundary.
- A second device reconstructs the same plan and history.
- Users can export and delete their data through tested workflows.
- Migration rollback and backup restore procedures are rehearsed in staging.

## P4 — Bank connection and reconciliation

### Objective

Compare forecasts with read-only bank activity and explain how actual behavior
affects savings outcomes.

### Deliverables

- Plaid Link-token and public-token exchange endpoints.
- Encrypted server-only access-token storage and institution disconnect flow.
- Verified webhook listener, queue, cursor-based transaction sync, and retries.
- Bank account selection and transaction consent experience.
- Categorization with user corrections and durable category rules.
- Planned-versus-actual reconciliation without plan mutation.
- Goal-date impact insights with transaction-level explanations.
- Sync status, stale-data messaging, reconnect, error, and incident states.
- Threat model, penetration review, retention policy, and operational runbook.

### Exit criteria

- Sync is idempotent across duplicate and out-of-order webhooks.
- No provider access token or secret appears in client code or logs.
- Imported data can be disconnected and deleted predictably.
- Every changed forecast is linked to inputs and an explanation.

## P5 — Release hardening and web readiness

### Objective

Ship a reliable mobile product and extract the proven shared layers required for a
browser client.

### Deliverables

- Critical-path end-to-end tests and release smoke suite.
- Accessibility audit, performance budgets, crash-free targets, and offline review.
- Privacy disclosures, store metadata, support and incident processes.
- EAS production builds, TestFlight/Play testing, phased rollout, and rollback.
- Extract `packages/domain` and `packages/contracts` after boundaries are proven.
- Web shell and platform chart adapter spike.
- Responsive information architecture and secure browser-session plan.

### Exit criteria

- Release candidate meets product, security, accessibility, and reliability gates.
- Store builds can be reproduced and rolled back.
- Mobile and web produce identical domain outputs from contract fixtures.

## Test strategy

| Layer | Primary coverage |
| --- | --- |
| Domain unit | money, recurrence, taxes, forecasts, reconciliation |
| Property-based | rounding, recurrence invariants, event ordering |
| Component | form validation, states, accessible labels, interactions |
| API integration | auth scopes, transactions, migrations, idempotency |
| Contract | OpenAPI compatibility and serialized money/date formats |
| End-to-end | onboarding, calendar, strategy apply, sync, delete account |
| Operational | webhook replay, backup restore, token rotation, rollback |

Use only synthetic financial fixtures in tests, screenshots, demos, and logs.

## Non-functional requirements

- **Accessibility:** WCAG 2.2 AA intent; native screen-reader, text scaling, contrast,
  reduced motion, and non-color status cues.
- **Performance:** interactive launch and projection targets defined in P0; profile
  on a supported lower-tier device.
- **Reliability:** idempotent mutations, graceful offline reads, observable jobs.
- **Security:** OWASP mobile/API practices, least privilege, secret scanning, and
  dependency review.
- **Privacy:** consent by purpose, minimum collection, deletion, export, retention.
- **Compatibility:** supported Expo SDK 54 iOS/Android matrix; web is P5 scope.

## Explicitly deferred

- Investment recommendations or portfolio optimization
- Credit scoring and lending decisions
- Filing-ready tax calculations
- Money movement, bill payment, or account write access
- Multi-currency conversion before a supported use case exists
- Household collaboration before single-user ownership is secure

## Primary technical references

- [Expo SDK 54 reference](https://docs.expo.dev/versions/v54.0.0/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Plaid Transactions](https://plaid.com/docs/transactions/)
