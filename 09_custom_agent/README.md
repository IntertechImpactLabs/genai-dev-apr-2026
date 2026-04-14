# D10: Build an Agent in 30 Lines

**Course section:** 6. Building Custom Agents | **Duration:** 15 min

## Purpose

Show that the agent loop is a library you can use. Build a minimal security review agent from scratch and run it. Close the circle from D1 (single tool call) to a complete custom agent.

## Files

- `agent.py` — Minimal agent using Claude Agent SDK (~30 lines)
- `agent_openai.py` — Same concept, OpenAI Agents SDK (for comparison)
- `server.js` — Intentionally vulnerable Express server for the agent to review
- `demo-script.md` — Step-by-step instructor script
- `fallback/agent-output.md` — Pre-captured output

## Prerequisites

```bash
pip install claude-agent-sdk
export ANTHROPIC_API_KEY=your-key-here
```

## Quick run

```bash
python agent.py
```

The agent will read `server.js`, identify 9 security issues (4 critical, 3 high, 2 medium), and suggest fixes for each.

## Key teaching moment

The entire agent is ~15 lines of core logic. System prompt + tools + loop. The same pattern behind Claude Code, Copilot, and every agent framework.
