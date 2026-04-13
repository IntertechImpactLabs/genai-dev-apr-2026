# D8: Build a Skill

**Course section:** 5. MCP, Skills & Orchestration | **Duration:** 10 min

## Purpose

Show that Skills are reusable packaged capabilities — a markdown file that teaches an agent how your team works. No code, no build step, just structured instructions.

## The example

A code review checklist skill. The agent reviews code against 5 categories (error handling, input validation, security, testing, code clarity) and reports PASS/FAIL/N/A for each item.

## Files

- `demo-script.md` — Step-by-step instructor script
- `sample-project/.claude/skills/code-review/SKILL.md` — The review skill
- `sample-project/handlers/createOrder.js` — Intentionally flawed code to review
- `fallback/review-output.md` — Pre-captured review output

## Quick run

1. Open `sample-project/` in Claude Code
2. Ask: "Review the createOrder handler"
3. Watch the agent follow the skill's checklist
