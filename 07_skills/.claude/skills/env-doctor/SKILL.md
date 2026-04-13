---
name: env-doctor
description: Diagnose local development environment problems. Use when asked to check the environment, debug setup issues, or help a developer get the project running.
---

# Environment Doctor

Diagnose and explain local development environment problems for a new or returning developer.

## Step 1: Run the checks

```
scripts/check-env.sh
```

The script checks runtime versions, required environment variables, and local setup state. Each line is prefixed with a status tag: `OK`, `MISSING`, `WARN`, or `DEFAULT`.

## Step 2: Interpret results

For each non-OK item, explain:
- **What it is** — one sentence for someone unfamiliar with the project
- **Why it matters** — what breaks if it's missing or wrong
- **How to fix it** — the exact command or step

Group items by severity:

| Severity | Criteria |
|---|---|
| **Blocker** | App will not start or will crash on first use |
| **Warning** | App starts but a feature will fail silently |
| **Advisory** | Safe default is in use, but worth knowing |

## Step 3: Output a fix checklist

After the diagnosis, output a numbered checklist of only the actions the developer needs to take, in order. Skip anything that is already OK.

Example format:

```
## Fix checklist

1. [ ] Copy `.env.example` to `.env` and fill in DATABASE_URL
2. [ ] Run `npm install` to restore node_modules
3. [ ] Upgrade Node.js to >=18 (current: 16.x)
```

If everything passes, say so explicitly: "Environment looks healthy — nothing to fix."
