# Savings goal repository contract

Status: local P0 contract  
Owner: Goals feature / domain  
External API: none introduced

`SavingsGoalRepository` is the read port used by the sample Goals feature. The
feature and domain depend on the interface; the current synthetic adapter is
replaceable and is not imported by either layer.

## Operation

```ts
interface SavingsGoalRepository {
  list(): Promise<SavingsGoalRepositoryResult>;
}
```

## Result variants

| Result | Required fields | Feature behavior |
| --- | --- | --- |
| Success | `data`, `freshness`, `updatedAt` | Summarize goals; empty data becomes the empty state |
| Offline | safe `message`, optional `cachedData` | Show offline notice and retain cached summaries when present |
| Error | safe `message` | Show an error without adapter details or sensitive values |

Success freshness is `fresh`, `stale`, or `partial`. It maps to ready, stale, and
partial feature states respectively. Loading is a feature lifecycle state before
the repository promise settles.

## Domain record

Savings goals use integer `bigint` minor units, a currency code, stable ID, name,
optional calendar-only target date, and a semantic goal kind. The feature presenter
maps goal kinds to icon and tone choices; the domain contains no visual styling. The domain
factory rejects empty identifiers/names, non-positive targets, and negative saved
amounts. MB-004 will generalize money and local-date primitives; this contract
deliberately keeps those concepts local until that ticket lands.

## Safety and serialization

The P0 repository is in-process and has no JSON transport. A future HTTP adapter
must serialize minor units as base-10 strings and validate them before creating a
domain record. Repository messages must be user-safe and must not expose raw
provider errors, account identifiers, or financial logs.

Only `SYNTHETIC_SAVINGS_GOALS` is used by the current adapter and contract tests.
