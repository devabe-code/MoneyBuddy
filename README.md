# MoneyBuddy

MoneyBuddy is a mobile-first savings visualization app. It helps people understand
where each paycheck goes, compare saving strategies, and see how everyday spending
changes the date of their next financial milestone.

The first release targets iOS and Android with Expo and React Native. The shared
domain package is intentionally platform-neutral so the same forecasting rules can
support a web experience later.

> MoneyBuddy provides planning estimates, not tax, legal, or investment advice.
> Tax results must always show their assumptions and should never be presented as
> an official filing calculation.

## Product pillars

- **Cashflow calendar** — combine pay schedules, estimated taxes, recurring bills,
  and planned savings into a dated running-balance view.
- **Savings strategies** — compare fixed-dollar and percentage-per-paycheck plans,
  with clear goal dates and future-value tables.
- **Milestone journey** — keep a journal of goals such as a car, emergency fund, or
  home and show progress along a single savings journey.
- **Connected reality** — later, use read-only bank data to reconcile projections
  with actual spending and explain why a goal date moved.

## Repository status

This repository currently contains the foundation for the first product slice:

- an Expo Router mobile shell with Dashboard, Calendar, Goals, and Journey tabs;
- a small TypeScript API with a health endpoint;
- shared, tested money and savings-projection primitives;
- workspace scripts and a pull-request quality workflow.

The screens use illustrative data. Authentication, persistence, tax tables, and
bank connections are planned milestones and are not implemented yet.

## Project structure

```text
MoneyBuddy/
├── apps/
│   ├── api/                 # TypeScript/Express API boundary
│   └── mobile/              # Expo + React Native application
├── packages/
│   └── domain/              # Platform-neutral financial types and calculations
├── .github/workflows/       # Pull-request quality checks
├── architecture-plan.md     # Longer-term technical plan
└── package.json             # npm workspace commands
```

Keeping calculations in `packages/domain` prevents presentation code from owning
financial rules and gives the future web app the same source of truth.

## Getting started

### Requirements

- Node.js 22.13 or newer
- npm 10 or newer
- Xcode/iOS Simulator, Android Studio, or the Expo Go app for device testing

### Install and run

```bash
npm install
npm run mobile
```

From the Expo prompt, choose iOS, Android, web, or scan the QR code. The web target
is useful during development, but mobile remains the product priority.

Run the API in a second terminal:

```bash
npm run api
```

It starts on `http://localhost:3000`; `GET /health` reports service status.

### Quality checks

```bash
npm run check
```

This runs formatting validation, linting, TypeScript checks, and domain tests.

## Delivery milestones

### M0 — Foundation

**Outcome:** a repeatable, testable project that can ship preview builds.

- [x] Expo Router application shell and mobile navigation
- [x] Shared domain package using integer minor currency units
- [x] API boundary and health check
- [x] pull-request checks for format, lint, types, and tests
- [ ] choose authentication and database providers
- [ ] create development/staging environments and EAS preview builds

### M1 — Manual cashflow calendar

**Outcome:** a user can enter their finances and understand the next 12 months.

- profile, location, salary/gross pay, pay frequency, and next payday inputs;
- recurring income and expense rules with start/end dates;
- versioned tax-estimation rules with visible assumptions and effective date;
- gross-to-net paycheck breakdown;
- calendar day detail and projected running balance;
- tests for leap years, month-end dates, time zones, and pay schedules.

**Exit criteria:** a user can explain every calendar amount and reproduce the
projected balance from the displayed inputs.

### M2 — Savings goal planner

**Outcome:** a user can compare practical routes to a target amount.

- create, edit, archive, and prioritize savings goals;
- allocate a fixed amount or percentage from each paycheck;
- compare conservative, baseline, and aggressive strategies;
- savings table with balances by date and estimated completion dates;
- scenario changes that do not overwrite the user's baseline plan.

**Exit criteria:** the same inputs always produce the same auditable projection,
and unreachable goals are explained rather than given a misleading date.

### M3 — Milestone journey

**Outcome:** goals feel like a connected journey instead of isolated balances.

- journal entries, notes, target dates, and progress check-ins;
- car, emergency fund, home, and custom milestone templates;
- journey map showing completed, active, and future goals;
- progress history and timeline-change explanations.

**Exit criteria:** users can see what changed, when it changed, and how it affected
their journey.

### M4 — Bank-connected reconciliation

**Outcome:** projections respond to real spending without silently changing plans.

- read-only Plaid Link integration with server-held access tokens;
- incremental transaction sync and verified webhook handling;
- account/transaction consent, disconnect, deletion, and recovery flows;
- transaction categorization with user corrections;
- projected-versus-actual comparison and goal-date impact explanations.

**Exit criteria:** no bank credential or access token reaches the client, synced
data is idempotent, and every forecast adjustment is traceable.

### M5 — Release hardening and web

**Outcome:** a secure mobile release with a deliberate path to the browser.

- accessibility, offline/error states, performance budgets, and end-to-end tests;
- privacy review, threat model, encryption and retention verification;
- TestFlight/Play internal testing followed by store release;
- React Native Web shell reusing domain logic and compatible UI primitives.

## Architecture principles

1. **Money is stored as integers.** `1250` means `$12.50`; floating-point values
   are never used for persisted currency.
2. **Forecasts are reproducible.** Inputs, rule versions, and assumptions accompany
   every projection.
3. **Dates are explicit.** Calendar dates remain `YYYY-MM-DD`; instants use UTC.
   User time zones are stored separately.
4. **Actual and planned data stay distinct.** Bank transactions never overwrite
   user-authored plans.
5. **Sensitive integrations are server-side.** Provider secrets and bank access
   tokens are never bundled into Expo code.
6. **Web reuse starts at the domain layer.** Business rules and API contracts are
   shared; platform-specific UI is allowed where it improves the experience.

## Initial data model

The architecture plan includes a preliminary PostgreSQL schema. Before the first
migration, it should be expanded to include:

- household/profile and locale/time-zone settings;
- income and expense recurrence rules;
- tax-estimate version and assumptions;
- savings strategies and goal allocations;
- immutable projection snapshots and milestone journal entries;
- encrypted provider tokens, sync state, transaction categories, and audit events.

Database and authentication choices are intentionally deferred until M0 discovery
is complete, avoiding a migration commitment before the ownership and security
model is settled.

## Contributing

Create a focused branch, run `npm run check`, and open a pull request. Never commit
real financial data, bank credentials, `.env` files, Expo tokens, or provider
secrets. Use synthetic fixtures in tests and screenshots.

See [architecture-plan.md](./architecture-plan.md) for the original detailed plan.

## License

[MIT](./LICENSE)
