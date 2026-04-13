# D4: RAG — The Knowledge Gap

**Section:** 2. Context Engineering | **Duration:** 10 min | **Type:** Jupyter notebook

## Point it proves

LLMs don't know your internal data. Retrieval fills the gap. RAG is a context strategy — the R retrieves, the A augments the context window, the G generates from that enriched context. Same principle as CLAUDE.md but automated.

## Prerequisites

- Python 3.10+ with Jupyter
- `OPENAI_API_KEY` and `ANTHROPIC_API_KEY` in environment
- Dependencies: `openai`, `anthropic`, `numpy`, `python-dotenv`

## Setup slide talking points

> "We've been engineering context by writing better prompts and adding project files. But what if the knowledge you need isn't in the model at all — it's in your company's database, your docs, your product catalog? That's the retrieval problem. Let's see it."

## Demo steps

### Step 1: The knowledge gap (2 min)

**Run:** Cells 1-6 (setup + "ask without context")

**What to point out:** Multiple models, all fail the same way. They don't know about your internal products. Some hallucinate confidently, some admit ignorance. Neither is useful.

**What to say:**
> "Four different models, same result — none of them know about LicketySplit Pro. It's not a model quality problem. It's a knowledge boundary. The product isn't in their training data."

### Step 2: Keyword retrieval (2 min)

**Run:** Cells 7-10 (keyword search + augmented prompt)

**What to point out:** Show the augmented prompt — the product data is now injected into the context. Show that both GPT and Claude now give accurate, grounded answers using the actual data.

**What to say:**
> "The model didn't learn anything new. We searched our catalog, found the matching product, and put it in the prompt. That's the R-A-G: retrieve the data, augment the prompt, generate from context."

### Step 3: Keyword vs. semantic (2 min)

**Run:** Cells 12-14 (semantic search comparison)

**What to point out:** The comparison table. "high-speed data access" doesn't contain the word "cache" but semantic search still finds LicketySplit Pro. Keyword search misses it.

**What to say:**
> "Keyword search works when users use your terminology. Semantic search works when they describe what they need in their own words. In production RAG, you almost always want semantic search."

### Step 4: Skip or compress model comparison (2 min)

**Run:** Cell 16 (optional — model comparison with RAG). Can skip if time is tight.

**What to say (if running):**
> "Quick confirmation: once the context is right, the model matters less. GPT-3.5, GPT-4, Claude Haiku, Claude Sonnet — they all give accurate answers because the data is in the prompt."

### Step 5: Debrief (2 min)

**What to say:**
> "RAG is context engineering with an automated retrieval step. Instead of manually putting information in the prompt, you build a pipeline that finds the right information and injects it. The model never learns your data — it reads it fresh every time, from the context window. Same principle as the context files we just saw, just at a larger scale."

> "One more thing: in 2026, context windows are big enough that for many use cases you can skip the retrieval entirely and just put all your documents in the prompt. We'll talk about when to use RAG vs. long context in the slides."

## Notebook changes needed before delivery

| Cell | Change | Why |
|------|--------|-----|
| 6 | Update `claude-3-haiku-20240307` → current model | Deprecated model string |
| 6 | Update `claude-sonnet-4-20250514` → verify current | May need update |
| 11 | Update `gpt-5-mini-2025-08-07` → verify current | May need update |
| 16 | Update all model strings | Same |
| NEW | Add a debrief cell at the end | Connects RAG back to context engineering |

## Longer-term improvement

The fake product catalog ("LicketySplit Pro", "DiggityDog Analytics") works but feels artificial. A stronger version would use real but obscure data — e.g., the course repo's own content, an open-source project's API docs, or a realistic internal knowledge base. This is a nice-to-have, not a blocker.

## Fallback plan

The notebook has pre-run outputs saved. If APIs are down, just walk through the cells with existing outputs. The teaching points all come from the comparison, not from watching it generate live.
