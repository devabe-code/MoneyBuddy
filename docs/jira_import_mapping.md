# Jira Import Mapping for MoneyBuddy

Use this guide with [`moneybuddy_jira_import.csv`](./moneybuddy_jira_import.csv).

## Space setup

| Jira option | Value |
| --- | --- |
| Use settings from existing project | DevCodeAbe |
| Jira space | Software space |
| Template | Kanban |
| Space name | DevCodeAbe |
| Management | Team-managed |
| Access | Open |
| Key | SCRUM |

These choices belong to the Jira space setup screen and should not be mapped from
CSV columns.

## CSV field mapping

| CSV header | Jira destination | Notes |
| --- | --- | --- |
| Work Type | Work type | Map `Epic` and `Story` to matching Jira work types. |
| Summary | Summary | Required by Jira. Stable MoneyBuddy ID is included in brackets. |
| Description | Description | Contains user story, acceptance criteria, completion criteria, and source. |
| Work Item ID | Work item ID | Import-only numeric identifier used to construct hierarchy. |
| Parent | Parent | References the epic's numeric Work Item ID. |
| Status | Status | Map `To Do` to the space's initial Kanban status. |
| Priority | Priority | Uses Jira defaults: Highest, High, Medium, Low, Lowest. |
| Phase | Phase | Create a short-text or single-select custom field with P0–P5 values. |
| External ID | External ID | Create a short-text custom field for stable IDs such as `MB-001`. |
| Tshirt Size | Tshirt Size | Create a single-select custom field with S, M, and L. |
| Story Points | Story point estimate | If estimation is disabled, enable it or leave this column unmapped. |
| Labels | Labels | Map all five repeated Labels columns to the same Jira Labels field. |

## Import expectations

- 81 work items total
- 12 epics
- 69 stories
- Every story has exactly one epic parent
- All work items begin in `To Do`
- No assignee or reporter is imported because no user email address was supplied
- Jira will generate final keys such as `SCRUM-1`; `External ID` preserves the
  MoneyBuddy backlog identifier

## Recommended import checks

1. Import the entire CSV in one operation so parent references resolve.
2. Confirm the preview shows `Epic` and `Story` rather than converting all rows to
   a single work type.
3. Confirm the five Labels columns are all mapped to Labels.
4. After import, filter `workType = Epic` and confirm 12 results.
5. Open `[MB-E01] Foundation` and confirm it contains eight child stories.
6. Open `[MB-E12] Web readiness` and confirm it contains four child stories.
7. Confirm `MB-001` has parent `MB-E01` and phase `P0`.
8. Confirm `MB-1104` has parent `MB-E12` and phase `P5`.

If the space's initial status is named `Backlog` instead of `To Do`, map the CSV
`To Do` value to `Backlog` during import rather than editing every row.
