# D1: Tool Use Under the Hood

**Section:** 1. Intro to GenAI | **Duration:** 8 min | **Type:** Live API calls in VS Code

## Point it proves

LLMs are text predictors. Without tools, they guess. With tools, they act. The tool-call loop is the foundation of every agent.

## Prerequisites

- VS Code with REST Client extension
- `OPENAI_API_KEY` in `.env` file
- Network access to OpenAI API

## Setup slide talking points

> "We said LLMs predict the next token. Let's prove it. We're going to ask an LLM about today's weather three different ways and watch what changes."

## Demo steps

### Step 1: No tools (2 min)

**What to do:** Run Part 1 of `tool-use-demo.http` — the plain weather question.

**What to say:**
> "This is a raw API call. No tools, no agent framework — just a message to the model. Watch what comes back."

**What to point out:** The model either hedges ("I don't have access to real-time data") or fabricates a plausible answer. Either way, it can't actually check the weather. It's just predicting tokens.

**If it hallucinates:** Even better for teaching. "It gave you a confident answer, but it made it up. This is the hallucination problem — the model doesn't know what it doesn't know."

### Step 2: With tool definition (2 min)

**What to do:** Run Part 2 — same question, but now with a `get_weather` tool defined.

**What to say:**
> "Same question, same model. The only thing we added is a tool definition — a JSON schema that says 'hey, there's a function called get_weather you can call.' Watch how the response changes."

**What to point out:** The response is completely different. Instead of text, the model returns a `tool_calls` array. It's saying: "I need to call this function with these arguments." It didn't guess — it asked for help.

**Key moment:** Show the `tool_calls` JSON. "This is not text. This is structured data. The model is choosing to use a tool and telling us exactly what arguments to pass."

### Step 3: Tool result returned (2 min)

**What to do:** Run Part 3 — the complete conversation with the mock tool result fed back.

**What to say:**
> "In a real agent, something would actually call a weather API. We're going to simulate that — pretend we called the API and got back this data. Now we feed the result back to the model."

**What to point out:** The model takes the raw JSON data and produces a natural, conversational response. It uses the actual numbers from the tool result. No hallucination — it's grounded in real data.

**Key moment:** "The model didn't learn about weather. We gave it a tool, it decided to use it, we executed the tool, and fed the result back. Three roles in the conversation: user, assistant (with tool call), tool (with result)."

### Step 4: Debrief (2 min)

**What to say:**
> "What you just saw is the agent loop in miniature. Observe the question. Decide a tool is needed. Act by requesting a tool call. Evaluate the result and respond. That loop — observe, decide, act, evaluate — is the foundation of every agent. Claude Code, Copilot, Cursor — they're all running this loop, just with more tools and more iterations. Everything in this course is a variation on what you just saw."

## Fallback plan

If the API is down or rate-limited, show the screenshots in `fallback/`. The three responses are pre-captured.

## Common issues

| Issue | Fix |
|-------|-----|
| 401 Unauthorized | Check `OPENAI_API_KEY` in `.env` |
| Rate limited | Wait 30 seconds, or switch to a pre-captured response |
| Model returns text in Part 2 (no tool call) | Rare with current models. If it happens, re-run — or point out that tool use isn't guaranteed, the model *chooses* |
