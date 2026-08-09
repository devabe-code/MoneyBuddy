# MoneyBuddy

MoneyBuddy is a mobile-first savings visualization app built with Expo and React
Native. It helps people understand where each paycheck goes, compare savings
strategies, and see how everyday spending changes the date of their next financial
milestone.

The current repository includes the P0 navigation foundation on Expo SDK 54:
Today, Calendar, Goals, and Journey previews backed only by synthetic data. The
delivery plan and product framework live in [`docs/`](./docs/README.md).

## Run the app

```bash
npm install
npm start
```

Scan the QR code with Expo Go, or use the terminal shortcuts for Android, iOS, and
web.

Run all local quality checks with:

```bash
npm run check
```

## Documentation

- [Project framework](./docs/README.md)
- [Architecture](./docs/architecture.md)
- [Technical specification](./docs/tech_spec.md)
- [Product requirements](./docs/product_prd.md)
- [Design requirements](./docs/design_prd.md)
- [Epics and stories](./docs/epics_and_stories.md)
- [MB-001 implementation notes](./docs/implementation/MB-001.md)

## Important disclaimer

MoneyBuddy provides planning estimates, not tax, legal, accounting, or investment
advice. Calculations must expose their assumptions and must never be presented as
official filing results or guaranteed financial outcomes.

## License

[MIT](./LICENSE)
