# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing any code.

## Reuse is a delivery requirement

- Treat route files as composition layers. Keep reusable UI, state handling,
  formatting, calculations, fixtures, and feature behavior outside `app/`.
- Before adding code, search for an existing component, token, type, fixture,
  helper, or feature boundary that can be extended safely.
- Extract a shared component when a visual or interaction pattern appears more
  than once. Extract shared variables, constants, types, and pure functions rather
  than copying them between files.
- Put cross-feature primitives in `src/design-system`; put reusable domain-specific
  UI and behavior in `src/features/<feature>`. Do not move feature details into the
  design system merely to reduce line count.
- Prefer composition and explicit props over near-duplicate component variants.
  Preserve accessibility semantics when extracting or composing components.
- Keep one authoritative source for route metadata, application-state definitions,
  design tokens, synthetic fixtures, and future API/domain contracts.
- Keep constants beside the layer that owns them: visual values in design tokens,
  navigation values in navigation contracts, and feature values under that
  feature. Do not recreate a catch-all root `constants/` directory.
- Replace repeated literals and magic numbers with semantic, typed constants. Use
  `as const` or `Object.freeze` when immutability and literal types are part of the
  contract. Do not promote a one-off value merely to make it global.
- UI and fixture data must reference semantic tokens or variants; raw colors and
  platform styling values belong only in the design-system token source.
- Reuse must improve clarity. Do not create speculative abstractions for code that
  has only one use and no stable concept behind it.

## Tests travel with the code

- Every new or materially changed production module must have an adjacent
  `*.test.ts` or `*.test.tsx` file. Update the adjoining test in the same change.
- Test behavior and contracts, not implementation details. Reusable components
  require rendering tests; pure functions require boundary tests; accessibility
  work requires role, label, state, value, or announcement assertions.
- Every feature must cover its primary behavior plus relevant empty, loading,
  error, offline, stale, partial, and accessibility states. Document why a state is
  not applicable when it cannot occur yet.
- Bug fixes require a failing regression test before or alongside the fix.
- Route files may remain thin and be covered by navigation contract or integration
  tests, but feature behavior must not live untested inside a route.
- Use only synthetic financial information in tests, fixtures, snapshots, logs,
  and screenshots.
- `npm run check` is the minimum completion gate. Changes are not complete until
  lint, strict TypeScript, and the full Jest suite pass. Run Expo Doctor and a
  production export when dependencies, configuration, routing, or bundling change.
- The test-pairing contract in `src/test/test-pairing.test.ts` is intentional. Add
  narrow exemptions only for declarative barrel/type files and explain them in the
  test; do not bypass it to land untested behavior.
