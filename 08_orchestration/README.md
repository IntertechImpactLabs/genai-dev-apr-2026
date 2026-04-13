# D9: Subagents in Action

**Course section:** 5. MCP, Skills & Orchestration | **Duration:** 8 min

## Purpose

Show that complex tasks are handled by composing specialized agents. Watch orchestration happen naturally in a coding agent, then understand the architecture patterns (subagents, handoffs, pipelines).

## Structure

Two parts:
1. **Live demo (5 min):** Give Claude Code a multi-part task and narrate the delegation
2. **Architecture (3 min):** Explain the three orchestration patterns with a diagram

## Files

- `demo-script.md` — Step-by-step instructor script with talking points and architecture diagram
- `fallback/` — Pre-captured session for when live demo is slow

## The prompt

```
Add a health check endpoint to the Express app. It should check database connectivity 
and return status information. Write the endpoint, add a test for it, and update the 
README with the new endpoint documentation.
```

This naturally splits into code + test + docs, showing orchestration in action.
