# D3: Context Files in Action

**Section:** 2. Context Engineering | **Duration:** 5 min | **Type:** Live coding (agent interaction)

## Point it proves

Project-level context files (CLAUDE.md, .github/copilot-instructions.md) change agent behavior without changing your prompt. Context engineering isn't just about what you type — it's about what the agent reads automatically.

## Prerequisites

- A coding agent: Claude Code (terminal) or GitHub Copilot in VS Code
- The sample project in this folder

## Files

- `sample-app/server.js` — Minimal Express route with no error handling (the "before" state)
- `sample-app/CLAUDE.md` — Team conventions file (add this for the "after" state)
- `sample-app/.github/copilot-instructions.md` — Same conventions, Copilot format
- `fallback/before.md` — Pre-captured agent output without context file
- `fallback/after.md` — Pre-captured agent output with context file

## Setup slide talking points

> "Context isn't just what you type in a prompt. Coding agents read project files automatically — CLAUDE.md, copilot-instructions.md, .cursorrules. These files are persistent context that shapes every interaction. Let's see the difference."

## Demo steps

### Step 1: Without context file (1.5 min)

**What to do:** Open the `sample-app/` directory in your agent. Make sure there's NO CLAUDE.md or copilot-instructions present. Ask:

```
Add error handling to the POST /api/users route in server.js
```

**What to point out:** The agent produces generic error handling — probably a try/catch with `console.error` and a `500 Internal Server Error` response. Functional but generic. No structure, no conventions, no consistency guarantees.

**What to say:**
> "This is fine. It works. But it's the agent's default — whatever it learned from training data. It doesn't know how your team handles errors."

### Step 2: Add the context file (0.5 min)

**What to do:** Copy `CLAUDE.md` into the `sample-app/` root (or if using Copilot, copy `.github/copilot-instructions.md`). Show the file briefly on screen.

**What to say:**
> "Here's our team's conventions file. Three rules: use structured error types with error codes, log with correlation IDs for tracing, and return RFC 7807 Problem Details format. Let's ask the exact same question."

### Step 3: With context file — same prompt (2 min)

**What to do:** Open a new agent session (or clear context). Ask the exact same question:

```
Add error handling to the POST /api/users route in server.js
```

**What to point out:** The output is dramatically different:
- Custom error classes with error codes (e.g., `USER_VALIDATION_ERROR`, `USER_ALREADY_EXISTS`)
- Logging with correlation IDs (`req.correlationId` or similar)
- RFC 7807 response format (`{ type, title, status, detail, instance }`)
- All three conventions from the file, followed without being asked

**What to say:**
> "Same prompt. Same agent. Same code. The only thing that changed is a file sitting in the project root. The agent reads it automatically on every request. You just went from 'generic' to 'our team's way' with zero extra typing."

### Step 4: Debrief (1 min)

**What to say:**
> "This is context engineering at the project level. Instead of repeating conventions in every prompt, you write them once in a context file and every developer on the team gets the same behavior. CLAUDE.md for Claude Code, copilot-instructions.md for Copilot, .cursorrules for Cursor — different files, same idea. Set up your context once, benefit on every interaction."

## Fallback plan

If the agent is slow or produces unexpected output, switch to the pre-captured outputs in `fallback/`. Show before.md and after.md side by side. The teaching point still lands.

## Tips for instructors

- **Start a fresh session** between Step 1 and Step 3. If the agent has the first output in its context, it may reference it. A clean session makes the comparison cleaner.
- **Don't over-explain the CLAUDE.md contents.** Three bullet points is enough. The point is that the file exists and the agent reads it — not the specific conventions.
- **If time is short**, skip live generation and just show the fallback files. The before/after comparison is the lesson.
