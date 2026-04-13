# D2: Prompt Progression — Context Quality = Output Quality

**Course section:** 2. Context Engineering | **Duration:** 10 min

## Purpose

Show that the same LLM produces dramatically different output for the same task depending on the context provided. Zero-shot → role-based → CLEAR framework, using a password scoring function as the consistent example.

## Structure

Three folders, each containing the output from a different prompt:

| Folder | Prompt style | What it demonstrates |
|--------|-------------|---------------------|
| `01_zero_shot/` | Bare minimum | Functional but arbitrary — no research basis, no standards |
| `02_role_based/` | Add a role | Better structure, entropy calculation, but still improvised scoring |
| `03_role_based_research/` | Full CLEAR framework | Production-quality library with NIST compliance, HIBP, full docs |

## Files

- `demo-script.md` — Step-by-step instructor script with talking points and the three prompts
- `01_zero_shot/scorePassword.ts` — Zero-shot output
- `02_role_based/scorePassword.ts` — Role-based output
- `03_role_based_research/password-scorer.ts` — CLEAR output (implementation)
- `03_role_based_research/README.md` — CLEAR output (documentation)
- `03_role_based_research/examples.ts` — CLEAR output (usage examples)
- `03_role_based_research/tests.ts` — CLEAR output (test suite)

## Key teaching moment

The outputs get dramatically better, but the model didn't change. The task didn't change. Only the context changed. That's the whole point of context engineering.
