# D8: Build a Skill

**Section:** 5. MCP, Skills & Orchestration | **Duration:** 10 min | **Type:** Live coding + agent interaction

## Point it proves

Skills are reusable packaged capabilities that agents load on demand. You can encode your team's tribal knowledge into a file, and every agent on the team uses it consistently. Skills are to agent behavior what CLAUDE.md is to project context — but more structured and more portable.

## Prerequisites

- Claude Code installed (skills are most mature in Claude Code as of April 2026)
- The `sample-project/` folder from this exercise

## Setup slide talking points

> "MCP connects agents to external tools. Skills teach agents how to do things your way — your review process, your test patterns, your documentation standards. Let's build one."

## Files

- `sample-project/.claude/skills/code-review/SKILL.md` — The skill we build
- `sample-project/handlers/createOrder.js` — Intentionally flawed code for the agent to review
- `fallback/review-output.md` — Pre-captured review output

## Demo steps

### Step 1: Show what a skill looks like (2 min)

**Open** `.claude/skills/code-review/SKILL.md`

**What to point out:**
- It's a markdown file. That's it. No SDK, no build step, no config.
- It has a name, a trigger description ("use this when asked to review code"), and structured instructions.
- The checklist covers 5 categories with specific, checkable items.
- The output format specifies PASS/FAIL/N/A with a summary.

**What to say:**
> "A skill is a markdown file in a known location. It tells the agent: when this situation comes up, follow these instructions. No code, no build step. You're writing instructions for a colleague — the agent reads them and follows them."

### Step 2: Show the code to review (1 min)

**Open** `handlers/createOrder.js`

**What to point out briefly:** "This order handler has some issues. Let's see if the agent catches them using our review skill."

**Don't enumerate the issues yourself** — let the agent find them. The bugs include:
- SQL injection (string interpolation in queries)
- No input validation
- No error handling (no try/catch on async operations)
- Sensitive data in logs (authorization token)
- Magic number (0.9 discount multiplier)
- No tests

### Step 3: Ask the agent to review (3 min)

**What to do:** In Claude Code, from the `sample-project/` directory:

```
Review the createOrder handler
```

**What to point out:**
- The agent picks up the skill automatically (in Claude Code, it discovers skills in `.claude/skills/`)
- The review follows the checklist format: Error Handling, Input Validation, Security, Testing, Code Clarity
- Each item gets PASS/FAIL/N/A with specific findings
- The summary gives a count: "X of Y checks passed"

**Key findings the agent should catch:**
- **FAIL: Error Handling** — no try/catch on any of the async database calls
- **FAIL: Input Validation** — userId and items are used without validation
- **FAIL: Security** — SQL injection via string interpolation, auth token logged
- **FAIL: Testing** — no tests
- **FAIL: Code Clarity** — magic number 0.9 for discount

**What to say:**
> "Without the skill, you'd get a generic review — 'this looks fine, maybe add error handling.' With the skill, you get a structured audit against your team's actual standards. Every developer on the team gets the same checklist, the same format, the same thoroughness."

### Step 4: Show where skills live (2 min)

**What to do:** Show the file structure:

```
project/
├── .claude/skills/code-review/SKILL.md     # Claude Code
├── .github/skills/code-review/SKILL.md     # GitHub Copilot
└── .cursor/skills/code-review/SKILL.md     # Cursor
```

**What to say:**
> "Different agents look in different places, but the format is the same — a SKILL.md file in a known directory. You can also share skills across projects by putting them in a global config. The key idea is progressive disclosure: the agent only loads a skill when it's relevant, keeping the context window clean."

**Optional visual:** Show the customization hierarchy:
```
Custom Instructions (always active)
    └── Skills (loaded on demand)
         └── MCP Tools (called when needed)
              └── Custom Agents (full autonomy)
```

### Step 5 (optional): env-doctor — script as diagnostic tool (3 min)

**What to say:**
> "Here's a second script-backed skill that shows a different use case. Instead of gathering data for the agent to reformat, this script runs a set of objective checks — and the agent's job is to triage and explain what they mean for a new developer."

**Open** `.claude/skills/env-doctor/SKILL.md`

**What to point out:**
- The script outputs a status tag per line: `OK`, `MISSING`, `WARN`, `DEFAULT`
- The skill instructs the agent to group findings by severity: Blocker, Warning, Advisory
- The output ends with a numbered fix checklist — only the actions that are actually needed

**Run it:**

```
Is my environment set up correctly?
```

**What the agent does:**
1. Runs `scripts/check-env.sh` — gets a plain-text status report
2. Identifies blockers (DATABASE_URL, JWT_SECRET) vs. safe defaults (PORT, NODE_ENV)
3. Explains *why* each missing thing matters, not just *that* it's missing
4. Produces a fix checklist ordered by priority

**What to say:**
> "A script can tell you DATABASE_URL is missing. It can't tell you that means every request will crash on the first DB call, or that the fix is to copy .env.example and run openssl rand. That's what the agent adds — interpretation, context, and a path forward."

**If live demo isn't possible:** show `fallback/env-doctor-output.md` — the script output and the agent's diagnosis are both there.

---

### Step 6: Debrief (2 min)

**What to say:**
> "You just encoded tribal knowledge into something reusable. A new developer on the team gets the same review quality as your most experienced reviewer — because the checklist is the same. Skills are portable, versionable, and composable. You can have a review skill, a test scaffolding skill, a migration skill — whatever patterns your team repeats."

> "MCP connects agents to external tools. Skills teach agents how to work. Together, they're how you go from a generic AI assistant to one that knows your team."

## Fallback plan

If the agent doesn't pick up the skill or produces unexpected output, show the pre-captured output in `fallback/review-output.md`. The teaching point — structured review against a checklist — still lands from the file contents.

## Connection to D9 (Orchestration)

Transition with:
> "We've connected agents to tools (MCP) and taught them skills. But what about big tasks that need multiple specialized agents? That's orchestration."
