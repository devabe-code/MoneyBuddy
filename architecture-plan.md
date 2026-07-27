# MoneyBuddy Architecture & Development Plan

## 1. Technology Stack Timeline

### Phase 1: Foundation & Infrastructure (The Scaffolding)

- **Frontend Framework:** Expo (React Native) with TypeScript.
- **Backend:** Node.js with NestJS or Express (TypeScript).
- **Database:** PostgreSQL (for strict ACID compliance in financial transactions).
- **ORM:** Prisma or Drizzle.
- **Authentication & Security:** Clerk or Supabase Auth.
- **DevOps & CI/CD:** GitHub Actions configured with automated quality gates (ESLint, Prettier, Jest) and Expo Application Services (EAS) for staging binaries.

### Phase 2: Core Features & Visualizations

- **State Management:** Zustand or Redux Toolkit.
- **Data Visualization:** Victory Native or React Native Skia.
- **Tax/Financial Logic:** `dinero.js` or `currency.js` to handle precise floating-point currency calculations.

### Phase 3: External Integrations & Hardening

- **Bank Connectivity:** Plaid API (for secure read-only bank feeds and transaction webhooks).
- **End-to-End Testing:** Detox (mobile E2E) and automated API contract testing.
- **Monitoring & Logging:** Sentry (error tracking) and Datadog (backend performance).

---

## 2. Agile Milestones & Sprints

### Milestone 1: Project Scaffolding & CI/CD (Sprints 1-2)

- **Infrastructure:** Set up PostgreSQL database environments (Dev, Staging, Prod).
- **Auth Workflow:** Implement user registration, login, and JWT-based session management.
- **Automated Quality Gates:** Configure pull request workflows requiring passing unit tests, type checks, and linting before merges.
- **Deployment Pipeline:** Hook up EAS Build to generate internal testing binaries on merge to staging.

### Milestone 2: The Cashflow Engine & Calendar (Sprints 3-4)

- **User Profiles:** Input salary, gross pay, and expected pay frequencies.
- **Tax Estimation:** Estimate net pay based on local tax brackets.
- **Calendar UI:** Map expected income days against fixed expenses to show the running balance projection over 12 months.

### Milestone 3: Savings Goals & Milestone Journal (Sprints 5-6)

- **Goal CRUD:** Allow users to track specific financial milestones (e.g., House Down Payment, 401k and Roth IRA contribution targets).
- **Strategy Modeling:** Interactive "Saving Table" to toggle variables (e.g., saving 10% vs. 15% per paycheck) and forecast milestone completion dates.
- **Visual Journey:** Charts tracking current progress against the projected timeline.

### Milestone 4: The Bank Connection (Sprints 7-8)

- **Plaid Integration:** Plaid Link flow to authenticate bank accounts.
- **Webhook Listener:** Secure backend endpoints to receive real-time transaction updates.
- **Data Reconciliation:** Compare actual daily spending against projected cashflow.
- **Real-time Adjustments:** Dynamically adjust target dates based on daily habits.

### Milestone 5: Pre-Release Hardening & QA (Sprint 9)

- **Security Audit:** Penetration testing, data encryption validation.
- **E2E Testing:** Detox tests for critical user journeys.
- **Performance:** Optimize chart rendering and API response times.

### Milestone 6: App Store Launch & Web Preparation (Sprint 10+)

- **EAS Submit:** Push to Apple TestFlight and Google Play Console.
- **Web Scaffolding:** Map React Native components to React Native for Web for the browser dashboard.

---

## 3. Database Schema (PostgreSQL)

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE plaid_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    plaid_item_id VARCHAR(255) UNIQUE NOT NULL,
    access_token VARCHAR(255) NOT NULL,
    institution_name VARCHAR(255),
    sync_cursor VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bank_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID REFERENCES plaid_items(id) ON DELETE CASCADE,
    plaid_account_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    mask VARCHAR(4),
    subtype VARCHAR(50),
    current_balance DECIMAL(14, 2),
    iso_currency_code VARCHAR(3) DEFAULT 'USD',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES bank_accounts(id) ON DELETE CASCADE,
    plaid_transaction_id VARCHAR(255) UNIQUE NOT NULL,
    amount DECIMAL(14, 2) NOT NULL,
    date DATE NOT NULL,
    merchant_name VARCHAR(255),
    pending BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cashflow_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    amount DECIMAL(14, 2) NOT NULL,
    rule_type VARCHAR(50) NOT NULL,
    frequency VARCHAR(50) NOT NULL,
    next_date DATE NOT NULL
);

CREATE TABLE savings_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    target_amount DECIMAL(14, 2) NOT NULL,
    current_saved DECIMAL(14, 2) DEFAULT 0.00,
    target_date DATE
);
```

---

## 4. CI/CD Pipeline Architecture

### Frontend (Expo EAS & GitHub Actions)

**Workflow (`.github/workflows/pr-checks.yml`):** Runs on pull requests to `main`. Executes ESLint, Prettier, TypeScript checks, and Jest unit tests to enforce code integrity.
**Workflow (`.github/workflows/eas-build.yml`):** Runs on push to `main`. Authenticates with Expo via an `EXPO_TOKEN` repository secret and triggers `eas build --platform all --profile preview --non-interactive` to automatically generate staging binaries.

### Backend (Node.js & PostgreSQL)

**Workflow (`.github/workflows/backend-ci.yml`):** Runs on pull requests. Spins up an ephemeral PostgreSQL service container (using `pg_isready` health checks). Runs Prisma/Drizzle migrations against the test database, followed by automated integration tests for cashflow calculations and Plaid webhook logic.

---

## 5. Plaid Webhook & Sync Architecture

1.  **Listener Endpoint:** `POST /api/webhooks/plaid`
    - Verifies the `Plaid-Verification` JWT using Plaid's public keys.
    - Validates the SHA-256 hash of the raw HTTP body.
    - Acknowledges the webhook immediately with a `200 OK` to prevent retries.
2.  **Sync Engine:** `syncPlaidTransactions(item_id)`
    - Triggered asynchronously by the `SYNC_UPDATES_AVAILABLE` webhook.
    - Fetches the saved `sync_cursor` from the `plaid_items` table.
    - Calls Plaid's `/transactions/sync` endpoint, paginating until `has_more` is false.
    - Executes a database transaction block to process `added`, `modified`, and `removed` transactions simultaneously before saving the `next_cursor` state.
