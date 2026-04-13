# D9: Subagents in Action

**Section:** 5. MCP, Skills & Orchestration | **Duration:** 8 min | **Type:** Live terminal + conceptual walkthrough

## Point it proves

Complex tasks are handled by composing specialized agents, not by making one agent do everything. This is the same pattern behind Copilot Coding Agent, Claude Code's subagents, and multi-agent frameworks.

## What's in this directory

```
.claude/
  agents/
    implementer.md     ← subagent: writes Express/TypeScript code
    test-writer.md     ← subagent: writes Jest/Supertest tests
src/
  app.ts               ← Express app (the codebase the agents work on)
  db.ts                ← Postgres pool + connection check
  routes/
    users.ts           ← existing CRUD routes
tests/
  users.test.ts        ← existing tests
```

The agents are defined in `.claude/agents/`. Open one to show the class before the demo.

---

## Part A: Show the subagent configs (2 min)

Open `.claude/agents/implementer.md` and `.claude/agents/test-writer.md`.

**What to point out:**

- The `description:` field is how Claude Code decides which subagent to use — it's read by the orchestrator at routing time
- The `tools:` list scopes what each agent can do. The implementer has no `Bash` — it can't run code. The test-writer has `Bash` so it can run `npm test` and fix failures before returning.
- The system prompt is the agent's identity. Each one says explicitly "do not do X — that is another agent's job"

**What to say:**
> "Two agents, two jobs. The implementer writes code. The test-writer writes tests. Neither one knows about the other — the orchestrator coordinates them. This is the same pattern behind every serious multi-agent system."

---

## Part B: Live demo (5 min)

### Setup

Make sure you're in this directory:
```
cd 08_orchestration
```

### The prompt

Paste this into Claude Code:

```
Add a health check endpoint to the Express app at GET /health.

It should return:
- status: "ok"
- uptime: seconds the server has been running
- db: whether the database connection is healthy

Write the endpoint in src/routes/health.ts and register it in src/app.ts.
Then write tests for it in tests/health.test.ts.
```

### What to watch for

| Phase | What you see | What to say |
|-------|-------------|-------------|
| Planning | Orchestrator reads the existing code | "It's reading the codebase first — it won't write code it hasn't read." |
| Delegation to implementer | `Task(implementer)` tool call appears | "There it is — the orchestrator delegating to a subagent. The implementer gets its own context, its own system prompt, only the tools it needs." |
| Implementer works | It reads `src/app.ts`, writes `src/routes/health.ts`, edits `src/app.ts` | "The implementer is focused. It only writes code. It won't touch the tests." |
| Delegation to test-writer | `Task(test-writer)` tool call appears | "Now the orchestrator hands off to the test-writer. Note: the test-writer reads the implementation first before writing a single test." |
| Test-writer runs tests | `Bash(npm test)` appears | "The test-writer runs the tests itself and fixes failures before returning. The orchestrator gets back a green result." |
| Integration | Orchestrator summarizes | "The orchestrator checks consistency and reports back. Three files changed, all coordinated." |

### What to say after:
> "You just watched orchestration. One prompt, two specialists, coordinated by an orchestrator. The test agent never saw the implementation agent's context. The orchestrator never wrote a single line of code or a single test."

---

## Part C: Architecture (1 min)

```
                    ┌─────────────────┐
                    │   Orchestrator   │
                    │  (main agent)    │
                    └───────┬─────────┘
                            │
              ┌─────────────┼─────────────┐
              │                           │
        ┌─────▼──────┐            ┌───────▼──────┐
        │ implementer │            │  test-writer  │
        │  subagent   │            │   subagent    │
        └─────┬──────┘            └───────┬──────┘
              │                           │
        Read, Write,                Read, Write,
        Edit, Glob,                 Edit, Bash
        Grep                        (npm test)
```

**Key insight:**
> "Each agent has a narrow job and only the tools it needs. The test-writer can run Bash. The implementer can't — it has no reason to. Scoping tools is how you prevent agents from doing things they shouldn't."

---

## Fallback plan

If the live demo is slow or subagent delegation isn't clearly visible:
- Show the two agent files and explain the `description:` routing mechanism (2 min)
- Show `src/routes/users.ts` and `tests/users.test.ts` as the "before" state
- Narrate what each agent would have done using the architecture diagram above

## Connection to D10 (Custom Agents)

> "You've now seen the full toolkit: MCP for tools, Skills for capabilities, orchestration for composition. In the next section, we'll build a custom agent from scratch — you'll see that the loop powering all of this is about 30 lines of code."
