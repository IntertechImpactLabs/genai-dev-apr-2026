# D9: Subagents in Action

**Course section:** 5. MCP, Skills & Orchestration | **Duration:** 8 min

## Purpose

Show that complex tasks are handled by composing specialized agents. Claude Code's orchestrator delegates to custom subagents defined in `.claude/agents/`, each with a focused system prompt and scoped tool access.

## Structure

```
.claude/
  agents/
    implementer.md     ← subagent: writes Express/TypeScript application code
    test-writer.md     ← subagent: writes Jest/Supertest tests, runs them
src/
  app.ts               ← Express app entry point
  db.ts                ← Postgres pool + connection helper
  routes/
    users.ts           ← existing user CRUD routes
tests/
  users.test.ts        ← existing tests (the "before" state)
package.json
tsconfig.json
demo-script.md         ← step-by-step instructor script
```

## The demo prompt

```
Add a health check endpoint to the Express app at GET /health.

It should return:
- status: "ok"
- uptime: seconds the server has been running
- db: whether the database connection is healthy

Write the endpoint in src/routes/health.ts and register it in src/app.ts.
Then write tests for it in tests/health.test.ts.
```

This naturally triggers orchestration: the main agent delegates implementation to the `implementer` subagent and test writing to the `test-writer` subagent.

## Key teaching points

1. **Subagent configs** — `.claude/agents/*.md` files define name, description, tools, and system prompt
2. **Description-based routing** — the orchestrator picks subagents based on their `description:` field
3. **Tool scoping** — each agent only gets the tools its job requires
4. **Focused context** — the test-writer never sees the implementer's context window, and vice versa
