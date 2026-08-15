# MoneyBuddy Project Framework

This document restores the product framework from the original MoneyBuddy README
and aligns it with the rebuilt Expo SDK 54 repository.

## Vision

MoneyBuddy helps people turn an abstract savings target into a dated, explainable
plan. It connects expected income, taxes, recurring expenses, savings strategies,
and eventually real bank activity so users can answer three questions:

1. Where is my money expected to go?
2. When can I realistically reach this goal?
3. What changed when that date moved?

## Product principles

- **Explain before advising.** Show inputs, assumptions, and calculation details.
- **Plan and actual stay separate.** Imported transactions never silently rewrite
  a user-authored plan.
- **Every change is traceable.** A moved goal date should have a visible reason.
- **Mobile first, web ready.** Optimize daily use for phones while keeping domain
  logic independent of React Native.
- **Privacy is a feature.** Collect only necessary data, keep secrets server-side,
  and make disconnect and deletion understandable.
- **Financial math is deterministic.** Persist money as integer minor units and
  version every forecasting rule.

## Product pillars

### Cashflow calendar

Combine pay schedules, estimated taxes, recurring bills, transfers, and savings
allocations into a dated running-balance view. Users should be able to inspect any
day and understand every included amount.

### Savings strategies

Model fixed-dollar and percentage-per-paycheck strategies. Compare conservative,
baseline, and focused scenarios through projected completion dates and future
balance tables without overwriting the active plan.

### Milestone journey

Connect emergency funds, cars, homes, education, retirement contributions, and
custom goals into a journaled journey. Preserve progress history, notes, and the
reason a target date changed.

### Connected reality

Use read-only bank data to compare projected and actual cashflow. Explain how
transactions helped or delayed a goal while allowing users to correct categories
and disconnect their institution.

## Current repository status

The repository currently contains:

- Expo SDK 54, React Native, TypeScript, and Expo Router;
- the Today, Calendar, Goals, and Journey navigation shell;
- shared design tokens, UI/state primitives, and synthetic preview fixtures;
- Expo Go-compatible local development;
- linting, strict TypeScript, navigation tests, and GitHub Actions quality checks.

The first P0 slice now provides MoneyBuddy's Today, Calendar, Goals, and Journey
navigation shell with synthetic previews and shared visual primitives. It does
**not** yet contain domain calculations, authentication, an API, a database, or
bank connectivity. Those are delivered incrementally by the phases in
[tech_spec.md](./tech_spec.md).

## Target repository shape

Start with a modular Expo application. Extract packages only after domain logic or
the web client creates a real reuse boundary.

```text
MoneyBuddy/
├── app/                       # Expo Router routes
├── src/
│   ├── features/              # Feature-owned UI and orchestration
│   ├── domain/                # Pure money, calendar, tax, and forecast rules
│   ├── services/              # API, storage, analytics, and auth adapters
│   ├── state/                 # Small client-only stores
│   ├── design-system/         # Tokens and reusable UI primitives
│   └── test/                  # Fixtures and cross-feature helpers
├── assets/
├── docs/
├── server/                    # Added when remote persistence begins
│   ├── src/modules/
│   └── prisma/
└── .github/workflows/
```

When the web client begins, move platform-neutral code into `packages/domain` and
API schemas into `packages/contracts`; do not create packages merely for symmetry.

## Delivery summary

| Phase | Outcome | User-visible proof |
| --- | --- | --- |
| P0 | Trusted foundation | Onboarding shell, local sample plan, quality gates |
| P1 | Manual cashflow | 12-month calendar and explainable net-pay estimate |
| P2 | Savings planning | Goal CRUD, strategy comparison, savings table |
| P3 | Milestone journey | Journal, progress history, multi-goal roadmap |
| P4 | Connected reality | Read-only bank sync and projected-vs-actual insights |
| P5 | Release and web readiness | Hardened mobile release and reusable web foundation |

## Success guardrails

- Forecasts generated from the same versioned inputs are identical.
- No currency is persisted as a binary floating-point value.
- No Plaid access token, database credential, or service secret reaches the app.
- Tax estimates state jurisdiction, tax year, filing assumptions, and limitations.
- Accessibility, offline behavior, and deletion flows are acceptance criteria, not
  post-launch cleanup.

## Document map

- [Architecture](./architecture.md) — target system boundaries and data model
- [Folder conventions](./architecture/folder-conventions.md) — enforced client dependency rules
- [Savings goal repository contract](./contracts/savings-goal-repository.md) — P0 sample data port
- [Technical specification](./tech_spec.md) — phased delivery and intended stack
- [Product PRD](./product_prd.md) — users, outcomes, requirements, and metrics
- [Design PRD](./design_prd.md) — information architecture and visual behavior
- [Epics and stories](./epics_and_stories.md) — delivery-ready backlog
- [Jira import mapping](./jira_import_mapping.md) — field mapping and validation
- [MB-001 implementation](./implementation/MB-001.md) — core navigation acceptance evidence
- [MB-002 implementation](./implementation/MB-002.md) — feature/domain boundary acceptance evidence
