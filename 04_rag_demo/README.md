# D4: RAG — The Knowledge Gap

**Course section:** 2. Context Engineering | **Duration:** 10 min

## Purpose

Demonstrate that LLMs don't know your internal data, and RAG fills the gap by retrieving relevant information and injecting it into the context window. Connects RAG back to the section theme: it's a context strategy, not a separate architecture.

## Files

- `rag_demo.ipynb` — Jupyter notebook with 4 parts: knowledge gap → keyword search → semantic search → model comparison
- `demo-script.md` — Step-by-step instructor script with talking points and timing

## Prerequisites

- Python 3.10+ with Jupyter
- `OPENAI_API_KEY` and `ANTHROPIC_API_KEY` in `.env`
- `pip install openai anthropic numpy python-dotenv`

## Key teaching moments

| Part | What it shows |
|------|--------------|
| Knowledge gap | Multiple models all fail — this isn't a model quality issue |
| Keyword RAG | Same models give accurate answers when data is in the prompt |
| Semantic search | Finds results even without keyword overlap — meaning over words |
| Debrief | RAG = automated context engineering. Same principle as CLAUDE.md |
