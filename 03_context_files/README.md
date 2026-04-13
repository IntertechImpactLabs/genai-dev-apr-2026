# D3: Context Files in Action

**Course section:** 2. Context Engineering | **Duration:** 5 min

## Purpose

Show that project-level context files (CLAUDE.md, copilot-instructions.md) change agent behavior without changing the prompt. Same prompt, same agent, dramatically different output.

## Files

- `demo-script.md` — Step-by-step instructor script with talking points
- `sample-app/server.js` — Minimal Express app with no error handling
- `sample-app/CLAUDE.md` — Team conventions file (for Claude Code)
- `sample-app/.github/copilot-instructions.md` — Same conventions (for Copilot)
- `fallback/before.md` — Pre-captured output without context file
- `fallback/after.md` — Pre-captured output with context file

## Quick run

1. Open `sample-app/` in your agent with NO CLAUDE.md present
2. Ask: "Add error handling to the POST /api/users route in server.js"
3. Note the generic output
4. Add `CLAUDE.md` to the project root
5. Start a fresh session, ask the exact same question
6. Compare the output — all three team conventions are followed
