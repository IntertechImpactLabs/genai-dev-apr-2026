# D10: Build an Agent in 30 Lines

**Section:** 6. Building Custom Agents | **Duration:** 15 min | **Type:** Live code walkthrough + execution

## Point it proves

The agent loop you've been watching all day — observe, plan, act, evaluate — is a library you can use. Building an agent is not magic. It's about 30 lines of code. The same loop powering Claude Code and Copilot is accessible to you.

## Prerequisites

- Python 3.10+ with `claude-agent-sdk` installed (`pip install claude-agent-sdk`)
- `ANTHROPIC_API_KEY` in environment
- Optional: `openai-agents` for the comparison (`pip install openai-agents`)

## Files

- `agent.py` — Minimal agent using Claude Agent SDK (~30 lines)
- `agent_openai.py` — Same concept, OpenAI Agents SDK (~25 lines, for comparison)
- `server.js` — Intentionally vulnerable Express server for the agent to review
- `fallback/agent-output.md` — Pre-captured output

## Setup slide talking points

> "You've been using agents all day. You've seen the loop. You've connected them to tools and taught them skills. Now let's build one. It's about 30 lines of Python."

## Demo steps

### Step 1: Show the target (1 min)

**Open** `server.js` briefly.

**What to say:**
> "Here's a server with some security issues. We're going to build an agent that reviews it — not using Claude Code or Copilot, but our own agent, from scratch."

Don't enumerate the issues. Let the agent find them. (Issues include: hardcoded API key, SQL injection, path traversal, plaintext passwords, no auth on admin endpoint, debug endpoint leaking env vars.)

### Step 2: Walk through the agent code (5 min)

**Open** `agent.py`. Walk through it top to bottom.

**Line by line:**

```python
from claude_agent_sdk import query, ClaudeAgentOptions, AssistantMessage, ResultMessage
```
> "One import. The SDK gives us `query` — that's the agent loop — and message types to process the output."

```python
async for message in query(
    prompt="Review server.js for security issues...",
    options=ClaudeAgentOptions(
        system_prompt="You are a senior security engineer...",
        allowed_tools=["Read", "Glob", "Grep"],
        permission_mode="default",
    ),
):
```
> "The entire agent is this function call. `query()` takes a prompt (the task), a system prompt (the agent's expertise), and a list of tools. That's it. The SDK handles the loop — observe the file system, plan the review, act by reading files, evaluate what it finds."

> "`allowed_tools` is the agent's toolkit. We're giving it file reading tools. In a production agent, you could add MCP servers, custom tools, database access — anything."

```python
if isinstance(message, AssistantMessage):
    for block in message.content:
        if hasattr(block, "text"):
            print(block.text)
```
> "This loop processes each step of the agent's work. When it thinks, plans, or writes findings, we print it. When it calls a tool, the SDK executes it automatically."

**Key moment:** "Count the lines. The core agent is about 15 lines. The rest is imports and message processing. That's it. This is the same loop Claude Code runs — just with more tools and a more sophisticated UI."

### Step 3: Run it (4 min)

**What to do:**

```bash
cd exercises/10_custom_agent
python agent.py
```

**What to narrate as it runs:**

| What you see | What to say |
|-------------|-------------|
| Agent reads server.js | "Observe phase — it's reading the file" |
| Agent starts listing issues | "It found the hardcoded API key. It found the SQL injection. These are the same issues a human reviewer would catch." |
| Agent suggests fixes | "It's not just finding problems — it's suggesting specific fixes with line numbers" |
| Agent finishes | "The full agent loop: observe the code, plan the review, act by analyzing each section, evaluate and report." |

### Step 4: Show the SDK comparison (2 min)

**Open** `agent_openai.py` side by side with `agent.py`.

**What to point out:**
- Same structure: system prompt + tools + run
- Different SDK, different API surface, same pattern
- OpenAI uses `Agent()` + `Runner.run_sync()`, Claude uses `query()` with options
- The agent loop is the same regardless of provider

**What to say:**
> "Different SDK, same pattern. An agent is a system prompt, a set of tools, and a loop. The SDK handles the plumbing. You decide what the agent knows and what it can do."

### Step 5: Callbacks to earlier demos (1 min)

**What to say:**
> "Look at what we built today, start to finish. In D1, we saw a single tool call — model asks for weather data, gets it back. That was the atom. In D5, we watched an agent run that loop continuously — observe, plan, act, evaluate. In D7 and D8, we gave agents tools (MCP) and capabilities (Skills). And now, in 30 lines of code, you built the same thing. The entire arc — from one API call to a custom agent — is the same loop at different scales."

### Step 6: Debrief (2 min)

**What to say:**
> "You don't need a framework to build an agent. You need a system prompt, some tools, and a loop. The SDKs — Claude Agent SDK, OpenAI Agents, Google ADK, LangGraph — they're all giving you the same thing: a convenient way to run that loop with tool execution, context management, and message handling."

> "The mental model you learned today transfers. Tools will change. SDKs will evolve. New models will ship. But the loop stays the same: observe, plan, act, evaluate. That's the foundation."

## Fallback plan

If the API is slow or the agent produces unexpected output:
1. Walk through the code (Step 2) — the teaching point is in the code itself
2. Show `fallback/agent-output.md` for the expected output
3. The comparison slide (Step 4) works without running anything

## Tips for instructors

- **Don't rush the code walkthrough.** Students need to see that this is simple. Linger on the `query()` call and count the lines. The "aha" is that it's not complex.
- **Let the agent run.** Resist narrating over every line of output. Let students watch it work for 30-60 seconds, then comment on what happened.
- **The callback to D1 is the payoff.** Don't skip Step 5. The arc from "one API call with a weather tool" to "a custom security review agent" is the whole course in miniature.
