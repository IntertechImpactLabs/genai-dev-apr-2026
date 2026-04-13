# D1: Tool Use Under the Hood

**Course section:** 1. Intro to GenAI | **Duration:** 8 min

## Purpose

Demonstrate that LLMs are text predictors that need tools to act. The tool-call loop (user → model → tool call → tool result → model) is the foundation of every agent.

## Files

- `tool-use-demo.http` — REST Client file with 3 parts (no tools → with tools → complete loop)
- `demo-script.md` — Step-by-step instructor script with talking points and timing
- `fallback/` — Pre-captured screenshots for each response (create before delivery)

## Prerequisites

- VS Code with [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension
- `OPENAI_API_KEY` environment variable (in `.env` file in this directory)

## Quick run

1. Open `tool-use-demo.http` in VS Code
2. Click "Send Request" on Part 1, talk through the response
3. Click "Send Request" on Part 2, show the `tool_calls` structure
4. Click "Send Request" on Part 3, show the grounded response
5. Debrief: connect to the agent loop

## Key teaching moments

| Part | What happens | What it teaches |
|------|-------------|-----------------|
| 1. No tools | Model hedges or hallucinates | LLMs can only predict tokens — they can't act |
| 2. With tool def | Model returns `tool_calls` JSON | Given a tool schema, the model *chooses* to use it |
| 3. Complete loop | Model gives grounded answer | The tool result becomes context — no hallucination |
